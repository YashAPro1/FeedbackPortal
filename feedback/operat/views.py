from django.shortcuts import render,HttpResponse
from django.db import models as mod
from django.http import JsonResponse
from django.contrib.auth.models import User
from . serializer import pracquestmodelSerializers,TheorymodelSerializers,FacultyMapmodelSerializers,SubjectmodelSerializers,FacultymodelSerializers,UserRegisterSerializer, UserLoginSerializer,DepartmentmodelSerializers
from rest_framework.decorators import api_view,permission_classes,authentication_classes
from . import models
from rest_framework.response import Response
from rest_framework import status
from anony.models import Theory_feedback,Practical_feedback
import io
from rest_framework.parsers import JSONParser
from rest_framework.authentication import BasicAuthentication,SessionAuthentication
from rest_framework.permissions import IsAuthenticated,IsAuthenticatedOrReadOnly
from rest_framework.views import APIView
from django.contrib.auth import get_user_model, login, logout
from .validations import custom_validation, validate_email, validate_password
from rest_framework import permissions
from django.conf import settings
User = settings.AUTH_USER_MODEL
from .filters import SubjectsFilter,FacultyFilter,MapfacultyFilter,TheoryQuestionFilter,PracticalQuestionFilter,DepartmentFilter
# Create your views here.



# permission_classes([IsAuthenticatedOrReadOnly])
@api_view(["POST"])  
def staffSignup(request):
    if request.method=="POST":
        # Get the signup parameters2
         # ##start
        # json_data = requests.data
        # stream = io.BytesIO(json_data)
        # python_data = JSONParser.parse(stream=stream)
        # serializer = pracquestmodelSerializers(python_data)
        # ##end
        print(request.data)
        username=request.data['username']
        email=request.data['email']
        fname=request.data['fname'] 
        lname=request.data['lname']
        pass1=request.data['pass1']

        # check for wrong input
         
        if User.objects.filter(username=username).exists():
           return JsonResponse({'handlelogin':"already exist user"})
        else:
            myuser = User.objects.create_user(username, email, pass1)
            myuser.first_name= fname
            myuser.last_name= lname
            myuser.save()
            return JsonResponse({'handlelogin':"done"})

    else:
        return JsonResponse({"user":"404 - Not found"})
    



# permission_classes([IsAuthenticatedOrReadOnly])
@api_view(['GET',"POST"])    
def pracquestDetail(requests):
    #For posting the data
    if requests.method  == "POST":
        # ##start
        # json_data = requests.body
        # stream = io.BytesIO(json_data)
        # python_data = JSONParser.parse(stream=stream)
        # serializer = pracquestmodelSerializers(data=python_data)
        # ##end
        
        serializer = pracquestmodelSerializers(data=requests.data)
        if serializer.is_valid():
            serializer.save()
            res = {"status":"posted succesfully"}
            return Response(res,status=status.HTTP_201_CREATED)
        else:
            return Response({"status":"Unsuccesfull"},status=status.HTTP_400_BAD_REQUEST)
    #for retriving the data
    else:
        tasks = models.practical_questions.objects.all()
        filterset = PracticalQuestionFilter(requests.GET, queryset=tasks)
        if filterset.is_valid():
         queryset = filterset.qs
        serializer = pracquestmodelSerializers(queryset,many=True)

        return Response(serializer.data)


# @permission_classes([IsAuthenticatedOrReadOnly])
@api_view(['GET',"POST"])    
def theoryquestDetail(requests):
    #For posting the data
    if requests.method  == "POST":
        # ##start
        # json_data = requests.data
        # stream = io.BytesIO(json_data)
        # python_data = JSONParser.parse(stream=stream)
        # serializer = TheorymodelSerializers(python_data)
        # ##end
        serializer = TheorymodelSerializers(requests.data)
        if serializer.is_valid():
            serializer.save()
            res = {"status":"posted succesfully"}
            return Response(res,status=status.HTTP_201_CREATED)
        else:
            return Response({"status":"Unsuccesfull"},status=status.HTTP_400_BAD_REQUEST)
    #for retriving the data
    else:
        tasks = models.theory_questions.objects.all()
        filterset = TheoryQuestionFilter(requests.GET, queryset=tasks)
        if filterset.is_valid():
         queryset = filterset.qs
        serializer = TheorymodelSerializers(queryset,many=True)
        
        return Response(serializer.data)


# @authentication_classes([SessionAuthentication,BasicAuthentication])
# @permission_classes([IsAuthenticated])
# @permission_classes([IsAuthenticatedOrReadOnly])
@api_view(['GET',"POST"])    
def mapfacultyDetail(requests):
    #For posting the data
    
    if requests.method  == "POST":
        # ##start
        # json_data = requests.body
        # stream = io.BytesIO(json_data)
        # python_data = JSONParser.parse(stream=stream)
        # serializer = FacultyMapmodelSerializers(data=python_data)
        # ##end
        serializer = FacultyMapmodelSerializers(data=requests.data)
        if serializer.is_valid():
            serializer.save()#owner = requests.user
            res = {"status":"posted succesfully"}
            return Response(res,status=status.HTTP_201_CREATED)
        else:
            return Response({"status":"Unsuccesfull"},status=status.HTTP_400_BAD_REQUEST)
    #for retriving the data    
    else:
        tasks = models.Mapfaculty.objects.all()
        filterset = MapfacultyFilter(requests.GET, queryset=tasks)
        if filterset.is_valid():
         queryset = filterset.qs
        serializer = FacultyMapmodelSerializers(queryset,many=True)
        
        return Response(serializer.data)


# @permission_classes([IsAuthenticatedOrReadOnly])
@api_view(['GET',"POST"])    
def SubjectDetail(requests):
    #For posting the data
     
    if requests.method  == "POST":
        # ##start
        # json_data = requests.data
        # stream = io.BytesIO(json_data)
        # python_data = JSONParser.parse(stream=stream)
        # serializer = SubjectmodelSerializers(python_data)
        # ##end
        serializer = SubjectmodelSerializers(requests.data)
        if serializer.is_valid():
            serializer.save()
            res = {"status":"posted succesfully"}
            return Response(res,status=status.HTTP_201_CREATED)
        else:
            return Response({"status":"Unsuccesfull"},status=status.HTTP_400_BAD_REQUEST)
    #for retriving the data
    else:
        tasks = models.Subjects.objects.all()
        filterset = SubjectsFilter(requests.GET, queryset=tasks)
        if filterset.is_valid():
         queryset = filterset.qs
        serializer = SubjectmodelSerializers(queryset,many=True)
        
        return Response(serializer.data)


@api_view(['GET',"POST"])    
# @permission_classes([IsAuthenticatedOrReadOnly])
def FacultyDetail(requests):
    #For posting the data
    
    if requests.method == 'POST':
         # ##start
        # json_data = requests.data
        # stream = io.BytesIO(json_data)
        # python_data = JSONParser.parse(stream=stream)
        # serializer = FacultymodelSerializers(python_data)
        # ##end
        serializer = FacultymodelSerializers(data=requests.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            Response({"status":"Unsuccesfull"},status=status.HTTP_400_BAD_REQUEST)
    #for retriving the data
    else:

        tasks = models.Faculty.objects.all()
        filterset = FacultyFilter(requests.GET, queryset=tasks)
        if filterset.is_valid():
         queryset = filterset.qs
        serializer = FacultymodelSerializers(queryset,many=True)
        
        return Response(serializer.data)


# @permission_classes([IsAuthenticatedOrReadOnly])
@api_view(['GET',"POST"])    
def DepartmentDetail(requests):
    #For posting the data
    
    if requests.method == 'POST':
         # ##start
        # json_data = requests.data
        # stream = io.BytesIO(json_data)
        # python_data = JSONParser.parse(stream=stream)
        # serializer = FacultymodelSerializers(python_data)
        # ##end
        serializer = DepartmentmodelSerializers(data=requests.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            Response({"status":"Unsuccesfull"},status=status.HTTP_400_BAD_REQUEST)
    #for retriving the data
    else:

        tasks = models.Department.objects.all()
        filterset = DepartmentFilter(requests.GET, queryset=tasks)
        if filterset.is_valid():
         queryset = filterset.qs
        serializer = DepartmentmodelSerializers(queryset,many=True)
        
        return Response(serializer.data)
    
# @permission_classes([IsAuthenticatedOrReadOnly])
@api_view(["GET","POST"])
def Calculateavg(requests):
    faculty = "Mrunali"
    year = 2023
    sem = 5
    # faculty = requests.POST['faculty']
    # year = requests.POST['year']
    # sem = requests.POST['sem']
    cal = {}
    practical_feedback = {}
    theory_feedback = {}
    if models.Faculty.objects.filter(faculty_name=faculty).exists():
        id = models.Faculty.objects.get(faculty_name=faculty).id
    if models.Mapfaculty.objects.filter(faculty=id).exists():
        subject = models.Mapfaculty.objects.get(faculty=id).subject.subject
        department = models.Mapfaculty.objects.get(faculty=id).department
        division = models.Mapfaculty.objects.get(faculty=id).divison
        batch = models.Mapfaculty.objects.get(faculty=id).practical_batch
        cal['faculty'] = faculty
        cal['subject'] = subject
        cal['department'] = department
        cal['division'] = division
        cal['batch'] = batch
        cal['batch'] = batch
        cal['semester'] = sem
        cal['f_date'] = year
        for i in range(12):
            theory_feedback[f"Q{i+1}"] = Theory_feedback.objects.filter(faculty=id,semester = sem,f_date=year).aggregate(mod.Avg(f"Q{i+1}"))[f'Q{i+1}__avg']
        for i in range(8):
            practical_feedback[f"Q{i+1}"] = Practical_feedback.objects.filter(faculty=id,semester = sem,f_date=year).aggregate(mod.Avg(f"Q{i+1}"))[f'Q{i+1}__avg']
        cal["practical_feedback"] = practical_feedback
        cal["theory_feedback"] = theory_feedback
        return JsonResponse(cal)
            

#Authentication

# For registration
class UserRegister(APIView):
	permission_classes = (permissions.AllowAny,)
	def post(self, request):
		clean_data = custom_validation(request.data)
		serializer = UserRegisterSerializer(data=clean_data)
		if serializer.is_valid(raise_exception=True):
			user = serializer.create(clean_data)
			if user:
				return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(status=status.HTTP_400_BAD_REQUEST)
    

#for LOGIN THE USER
class UserLogin(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = (SessionAuthentication,)
	##
	def post(self, request):
		data = request.data
		assert validate_email(data)
		assert validate_password(data)
		serializer = UserLoginSerializer(data=data)
		if serializer.is_valid(raise_exception=True):
			user = serializer.check_user(data)
			login(request, user)
			return Response(serializer.data, status=status.HTTP_200_OK)
          
# for logging out
class UserLogout(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = ()
	def post(self, request):
		logout(request)
		return Response(status=status.HTTP_200_OK)

#authentication ends
