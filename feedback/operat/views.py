from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.models import User
from . serializer import pracquestmodelSerializers,TheorymodelSerializers,FacultyMapmodelSerializers,SubjectmodelSerializers,FacultymodelSerializers
from rest_framework.decorators import api_view
from . import models
from rest_framework.response import Response
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
    
    tasks = models.practical_questions.objects.all()
    serializer = pracquestmodelSerializers(tasks,many=True)
    
    return Response(serializer.data)

@api_view(['GET',"POST"])    
def theoryquestDetail(requests):
    
    tasks = models.theory_questions.objects.all()
    serializer = TheorymodelSerializers(tasks,many=True)
    
    return Response(serializer.data)

@api_view(['GET',"POST"])    
def mapfacultyDetail(requests):
    
    tasks = models.Faculty.objects.all()
    serializer = FacultyMapmodelSerializers(tasks,many=True)
    
    return Response(serializer.data)

@api_view(['GET',"POST"])    
def SubjectDetail(requests):
    
    tasks = models.Subjects.objects.all()
    serializer = SubjectmodelSerializers(tasks,many=True)
    
    return Response(serializer.data)

@api_view(['GET',"POST"])    
def FacultyDetail(requests):
    
    tasks = models.Faculty.objects.all()
    serializer = FacultymodelSerializers(tasks,many=True)
    
    return Response(serializer.data)
    
    