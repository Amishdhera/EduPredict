
from rest_framework import status, generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.parsers import MultiPartParser, FormParser
from django.db.models import Avg
import csv
import io

from .models import Student
from .serializers import (
    StudentSerializer,
    StudentCreateSerializer,
    PredictionInputSerializer,
    PredictionOutputSerializer,
)
from .utils import predict_student_status, check_models_available
from .permissions import IsAdminUser, IsTeacherOrAdmin, IsOwnerOrTeacherOrAdmin


class PredictView(APIView):
    """
    POST /api/predict/
    Accepts JSON student data and returns dropout prediction.
    """
    # 🔥 FIXED: Allow any user (no authentication required for development)
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        serializer = PredictionInputSerializer(data=request.data)
        
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        # Check if models are available
        if not check_models_available():
            return Response(
                {'error': 'ML models not found. Please ensure model.pkl, scaler.pkl, and label_encoder.pkl are in the ml_models directory.'},
                status=status.HTTP_503_SERVICE_UNAVAILABLE
            )
        
        # Convert to model format and predict
        model_data = serializer.to_model_format()
        result = predict_student_status(model_data)
        
        if 'error' in result:
            return Response({'error': result['error']}, status=status.HTTP_503_SERVICE_UNAVAILABLE)
        
        # Determine if intervention is needed
        dropout_prob = result['dropout_probability']
        high_risk = dropout_prob > 0.7
        
        response_data = {
            'predicted_class': result['predicted_class'],
            'dropout_probability': dropout_prob,
            'all_probabilities': result['all_probabilities'],
            'grade_trend': result['grade_trend'],
            'high_risk': high_risk,
            'intervention_recommended': high_risk and result['predicted_class'] == 'Dropout',
            'saved_record_id': None,
        }
        
        # Optionally save the record
        if serializer.validated_data.get('save_record', False):
            student_data = {k: v for k, v in serializer.validated_data.items() if k != 'save_record'}
            student = Student.objects.create(
                user=request.user if request.user.is_authenticated else None,
                last_prediction=result['predicted_class'],
                last_dropout_probability=dropout_prob,
                **student_data
            )
            response_data['saved_record_id'] = student.id
        
        return Response(response_data, status=status.HTTP_200_OK)


class StudentListCreateView(generics.ListCreateAPIView):
    """
    GET /api/students/ - List student records
    POST /api/students/ - Create new student record
    """
    # 🔥 FIXED: Allow any user for development
    permission_classes = [permissions.AllowAny]
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return StudentCreateSerializer
        return StudentSerializer
    
    def get_queryset(self):
        user = self.request.user
        
        # Admin sees all
        if user.is_authenticated and (user.groups.filter(name='Admin').exists() or user.is_superuser):
            return Student.objects.all()
        
        # Teacher sees all
        if user.is_authenticated and user.groups.filter(name='Teacher').exists():
            return Student.objects.all()
        
        # Student sees only their own data
        if user.is_authenticated:
            return Student.objects.filter(user=user)
        
        # For unauthenticated users, return all (development)
        return Student.objects.all()
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user if self.request.user.is_authenticated else None)


class StudentDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    GET /api/students/<id>/ - Retrieve student record
    PUT /api/students/<id>/ - Update student record
    DELETE /api/students/<id>/ - Delete student record
    """
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    # 🔥 FIXED: Allow any user for development
    permission_classes = [permissions.AllowAny]


class ClassAverageView(APIView):
    """
    GET /api/class-average/
    Returns class average grades for radar chart comparison.
    """
    # 🔥 FIXED: Allow any user for development
    permission_classes = [permissions.AllowAny]
    
    def get(self, request):
        averages = Student.objects.aggregate(
            avg_1st_sem_grade=Avg('curricular_units_1st_sem_grade'),
            avg_2nd_sem_grade=Avg('curricular_units_2nd_sem_grade'),
            avg_1st_sem_approved=Avg('curricular_units_1st_sem_approved'),
            avg_2nd_sem_approved=Avg('curricular_units_2nd_sem_approved'),
            avg_1st_sem_enrolled=Avg('curricular_units_1st_sem_enrolled'),
            avg_2nd_sem_enrolled=Avg('curricular_units_2nd_sem_enrolled'),
            avg_admission_grade=Avg('admission_grade'),
        )
        
        return Response({
            '1st_sem_grade': averages['avg_1st_sem_grade'] or 0,
            '2nd_sem_grade': averages['avg_2nd_sem_grade'] or 0,
            '1st_sem_approved': averages['avg_1st_sem_approved'] or 0,
            '2nd_sem_approved': averages['avg_2nd_sem_approved'] or 0,
            '1st_sem_enrolled': averages['avg_1st_sem_enrolled'] or 0,
            '2nd_sem_enrolled': averages['avg_2nd_sem_enrolled'] or 0,
            'admission_grade': averages['avg_admission_grade'] or 0,
        })


@api_view(['GET'])
@permission_classes([permissions.AllowAny])  # 🔥 FIXED: Allow any user
def health_check(request):
    """Health check endpoint."""
    models_available = check_models_available()
    return Response({
        'status': 'healthy',
        'ml_models_loaded': models_available,
    })


class BatchUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    # 🔥 FIXED: Already AllowAny, keep as is
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        file_obj = request.FILES.get('file')
        if not file_obj:
            return Response({'error': 'No file provided'}, status=status.HTTP_400_BAD_REQUEST)

        if not file_obj.name.endswith('.csv'):
            return Response({'error': 'File must be a CSV'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            decoded_file = file_obj.read().decode('utf-8')
            io_string = io.StringIO(decoded_file)
            reader = csv.DictReader(io_string)
            
            # Column mapping
            column_mapping = {
                'Marital status': 'marital_status',
                'Application mode': 'application_mode',
                'Application order': 'application_order',
                'Course': 'course',
                'Daytime/evening attendance': 'daytime_evening_attendance',
                'Previous qualification': 'previous_qualification',
                'Nacionality': 'nationality',
                "Mother's qualification": 'mothers_qualification',
                "Father's qualification": 'fathers_qualification',
                "Mother's occupation": 'mothers_occupation',
                "Father's occupation": 'fathers_occupation',
                'Displaced': 'displaced',
                'Educational special needs': 'educational_special_needs',
                'Debtor': 'debtor',
                'Tuition fees up to date': 'tuition_fees_up_to_date',
                'Gender': 'gender',
                'Scholarship holder': 'scholarship_holder',
                'Age at enrollment': 'age_at_enrollment',
                'International': 'international',
                'Curricular units 1st sem (credited)': 'curricular_units_1st_sem_credited',
                'Curricular units 1st sem (enrolled)': 'curricular_units_1st_sem_enrolled',
                'Curricular units 1st sem (evaluations)': 'curricular_units_1st_sem_evaluations',
                'Curricular units 1st sem (approved)': 'curricular_units_1st_sem_approved',
                'Curricular units 1st sem (grade)': 'curricular_units_1st_sem_grade',
                'Curricular units 1st sem (without evaluations)': 'curricular_units_1st_sem_without_evaluations',
                'Curricular units 2nd sem (credited)': 'curricular_units_2nd_sem_credited',
                'Curricular units 2nd sem (enrolled)': 'curricular_units_2nd_sem_enrolled',
                'Curricular units 2nd sem (evaluations)': 'curricular_units_2nd_sem_evaluations',
                'Curricular units 2nd sem (approved)': 'curricular_units_2nd_sem_approved',
                'Curricular units 2nd sem (grade)': 'curricular_units_2nd_sem_grade',
                'Curricular units 2nd sem (without evaluations)': 'curricular_units_2nd_sem_without_evaluations',
                'Unemployment rate': 'unemployment_rate',
                'Inflation rate': 'inflation_rate',
                'GDP': 'gdp',
            }
            
            check_models_available()
            
            processed_count = 0
            high_risk_count = 0
            errors = []
            predictions_list = []

            for idx, row in enumerate(reader, start=1):
                try:
                    # Map CSV columns to API field names
                    mapped_row = {}
                    for csv_col, api_col in column_mapping.items():
                        if csv_col in row:
                            value = row[csv_col]
                            if value and value.strip():
                                mapped_row[api_col] = value
                    
                    # Add default values for missing required fields
                    defaults = {
                        'marital_status': '1',
                        'application_mode': '1',
                        'application_order': '1',
                        'course': '1',
                        'daytime_evening_attendance': '1',
                        'previous_qualification': '1',
                        'nationality': '1',
                        'gender': '1',
                        'age_at_enrollment': '20',
                        'international': '0',
                        'displaced': '0',
                        'educational_special_needs': '0',
                        'mothers_qualification': '1',
                        'fathers_qualification': '1',
                        'mothers_occupation': '1',
                        'fathers_occupation': '1',
                        'scholarship_holder': '0',
                        'debtor': '0',
                        'tuition_fees_up_to_date': '1',
                        'admission_grade': '12.0',
                        'curricular_units_1st_sem_credited': '0',
                        'curricular_units_1st_sem_enrolled': '0',
                        'curricular_units_1st_sem_evaluations': '0',
                        'curricular_units_1st_sem_approved': '0',
                        'curricular_units_1st_sem_grade': '0.0',
                        'curricular_units_1st_sem_without_evaluations': '0',
                        'curricular_units_2nd_sem_credited': '0',
                        'curricular_units_2nd_sem_enrolled': '0',
                        'curricular_units_2nd_sem_evaluations': '0',
                        'curricular_units_2nd_sem_approved': '0',
                        'curricular_units_2nd_sem_grade': '0.0',
                        'curricular_units_2nd_sem_without_evaluations': '0',
                        'unemployment_rate': '10.0',
                        'inflation_rate': '1.0',
                        'gdp': '1.0',
                    }
                    
                    # Apply defaults for missing fields
                    for field, default_value in defaults.items():
                        if field not in mapped_row or not mapped_row[field]:
                            mapped_row[field] = default_value
                    
                    # Convert values to appropriate types
                    data = {}
                    for k, v in mapped_row.items():
                        try:
                            if '.' in str(v):
                                data[k] = float(v)
                            else:
                                data[k] = int(float(v))
                        except (ValueError, TypeError):
                            data[k] = v
                    
                    serializer = PredictionInputSerializer(data=data)
                    if serializer.is_valid():
                        model_data = serializer.to_model_format()
                        result = predict_student_status(model_data)
                        
                        dropout_prob = result['dropout_probability']
                        predictions_list.append({
                            'student_id': idx,
                            'dropout_probability': dropout_prob,
                            'predicted_class': result['predicted_class'],
                            'high_risk': dropout_prob > 0.7
                        })
                        
                        if dropout_prob > 0.7:
                            high_risk_count += 1
                        
                        processed_count += 1
                    else:
                        errors.append(f"Row {idx}: {serializer.errors}")

                except Exception as e:
                    errors.append(f"Row {idx}: {str(e)}")

            return Response({
                'message': 'Batch processing completed',
                'processed_count': processed_count,
                'high_risk_count': high_risk_count,
                'predictions': predictions_list,
                'errors': errors[:20]
            }, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)