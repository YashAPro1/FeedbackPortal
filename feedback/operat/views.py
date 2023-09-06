from django.shortcuts import render,HttpResponse
from django.db import models as mod
from django.http import JsonResponse
from django.contrib.auth.models import User
from . serializer import pracquestmodelSerializers,TheorymodelSerializers,FacultyMapmodelSerializers,SubjectmodelSerializers,FacultymodelSerializers
from rest_framework.decorators import api_view
from . import models
from rest_framework.response import Response
from rest_framework import status
from anony.models import Theory_feedback,Practical_feedback

# Create your views here.


@api_view(["POST"])  
def staffSignup(request):
    if request.method=="POST":
        # Get the signup parameters2
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
    


@api_view(['GET',"POST"])    
def pracquestDetail(requests):
    #For posting the data
    if requests.method  == "POST":
        serializer = pracquestmodelSerializers(requests.data)
        if serializer.is_valid():
            return JsonResponse({"status":"posted succesfully"})
        else:
            return JsonResponse({"status":"Unsuccesfull"})
    #for retriving the data
    else:
        tasks = models.practical_questions.objects.all()
        serializer = pracquestmodelSerializers(tasks,many=True)

        return Response(serializer.data)

@api_view(['GET',"POST"])    
def theoryquestDetail(requests):
    #For posting the data
    if requests.method  == "POST":
        serializer = TheorymodelSerializers(requests.data)
        if serializer.is_valid():
            return JsonResponse({"status":"posted succesfully"})
        else:
            return JsonResponse({"status":"Unsuccesfull"})
    #for retriving the data
    else:
        tasks = models.theory_questions.objects.all()
        serializer = TheorymodelSerializers(tasks,many=True)
        
        return Response(serializer.data)

@api_view(['GET',"POST"])    
def mapfacultyDetail(requests):
    #For posting the data
    if requests.method  == "POST":
        serializer = FacultyMapmodelSerializers(requests.data)
        if serializer.is_valid():
            return JsonResponse({"status":"posted succesfully"})
        else:
            return JsonResponse({"status":"Unsuccesfull"})
    #for retriving the data    
    else:
        tasks = models.Faculty.objects.all()
        serializer = FacultyMapmodelSerializers(tasks,many=True)
        
        return Response(serializer.data)

@api_view(['GET',"POST"])    
def SubjectDetail(requests):
    #For posting the data
    if requests.method  == "POST":
        serializer = SubjectmodelSerializers(requests.data)
        if serializer.is_valid():
            return JsonResponse({"status":"posted succesfully"})
        else:
            return JsonResponse({"status":"Unsuccesfull"})
    #for retriving the data
    else:
        tasks = models.Subjects.objects.all()
        serializer = SubjectmodelSerializers(tasks,many=True)
        
        return Response(serializer.data)

@api_view(['GET',"POST"])    
def FacultyDetail(requests):
    #For posting the data
    if requests.method == 'POST':
        serializer = FacultymodelSerializers(data=requests.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    #for retriving the data
    else:

        tasks = models.Faculty.objects.all()
        serializer = FacultymodelSerializers(tasks,many=True)
        
        return Response(serializer.data)
    

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
            

    