from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.models import User
from . import models
from .serializer import theoryfeedbackmodelSerializers,pracfeedbackmodelSerializers
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
# Create your views here.



def anonySignup(request):
    if request.method=="POST":
        # Get the signup parameters2
        print(request.data)
        username=request.data['username']
        email=request.data['email']
        pass1=request.data['pass1']

        # check for wrong input
         
        if User.objects.filter(username=username).exists():
           return JsonResponse({'handlelogin':"already exist user"})
        else:
            myuser = User.objects.create_user(username, email, pass1)
            myuser.save()
            return JsonResponse({'handlelogin':"done"})

    else:
        return JsonResponse({"user":"404 - Not found"})
    


def instructorDetail(requests):
    return JsonResponse({"Bool":True})

@api_view(['GET',"POST"])    
def TheoryFeedback(requests):
    if requests.method == "POST":
        tasks = models.Theory_feedback.objects.all()
        serializer = theoryfeedbackmodelSerializers(tasks,many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        tasks = models.Theory_feedback.objects.all()
        serializer = theoryfeedbackmodelSerializers(tasks,many=True)
        return Response(serializer.data)
        
@api_view(['GET',"POST"])    
def PracticalFeedback(requests):
    if requests.method == "POST":
        tasks = models.Practical_feedback.objects.all()
        serializer = pracfeedbackmodelSerializers(tasks,many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        tasks = models.Practical_feedback.objects.all()
        serializer = pracfeedbackmodelSerializers(tasks,many=True)
        return Response(serializer.data)

    

    
    