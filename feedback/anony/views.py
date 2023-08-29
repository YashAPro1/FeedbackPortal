from django.shortcuts import render
from django.http import JsonResponse
from . import models
from .serializer import theoryfeedbackmodelSerializers,pracfeedbackmodelSerializers,UsermodelSerializers
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import bcrypt
from django.views.decorators.csrf import csrf_exempt
# Create your views here.


def anonySignup(request):
    if request.method=="POST":
        # Get the signup parameters2
        print(request.data)
        username=request.data['username']
        email=request.data['email']
        pass1=request.data['pass1']

        # check for wrong input
         
        if models.User.objects.filter(username=username).exists():
           return JsonResponse({'handlelogin':"already exist user"})
        else:
            myuser = models.User.objects.create_user(username, email, pass1)
            myuser.save()
            return JsonResponse({'handlelogin':"done"})

    else:
        return JsonResponse({"user":"404 - Not found"})
    


@api_view(['GET',"POST"])    
def TheoryFeedback(requests):
    if requests.method == "POST":
        serializer = theoryfeedbackmodelSerializers(requests.data)
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
        serializer = pracfeedbackmodelSerializers(requests.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        tasks = models.Practical_feedback.objects.all()
        serializer = pracfeedbackmodelSerializers(tasks,many=True)
        return Response(serializer.data)


@api_view(["POST"])
def usersignUp(request):
    if request.method == 'POST':
        tempdict = request.data.copy() # Empty initially
        pwd = tempdict["password"]
        bytePwd = pwd.encode('utf-8')
        mySalt = bcrypt.gensalt()
        pwd_hash = bcrypt.hashpw(bytePwd, mySalt)
        tempdict['password'] = pwd_hash
        print(tempdict)
        serializer = UsermodelSerializers(data=tempdict)
        
        if serializer.is_valid():
            serializer.save()
            
            return Response({"bool:True"}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    

@api_view(["GET","POST"])
@csrf_exempt
def UserLogin(requests):
    
    username = requests.POST['username']
    password = requests.POST['password']
    password = password.encode('utf-8')
    
    try:    
        instructor = models.User.objects.get(UserName = username)
        inspassword = instructor.password.encode('utf-8')
        if bcrypt.checkpw(password, inspassword):#checkking the password
            
            return Response({'bool':True,'msg':"Welcome",'Userid':instructor.id},status=status.HTTP_201_CREATED)
        else:
            return Response({'bool':False,'msg':"Incorrect Credentials"}, status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'bool':False,'msg':"Incorrect Credentials"},status=status.HTTP_400_BAD_REQUEST)
    