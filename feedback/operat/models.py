from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

import datetime

from django.conf import settings
User = settings.AUTH_USER_MODEL
# Create your models here.

#Authentications model
class AppUserManager(BaseUserManager):
    def create_user(self, email, password,username):
        if not email:
            raise ValueError('An email is required.')
        if not password:
            raise ValueError('A password is required.')
        email = self.normalize_email(email)
        user = self.model(email=email)
        user = self.model(username=username)
        user.set_password(password)
        user.is_staff = True
        user.save()
        return user
    def create_superuser(self, email, password,username):
        if not email:
            raise ValueError('An email is required.')
        if not password:
            raise ValueError('A password is required.')
        if not username:
            raise ValueError('A password is required.')
        user = self.create_user(email=email, password=password,username=username)
        user.is_superuser = True
        user.is_staff = True
        user.save()
        return user


class AppUser(AbstractBaseUser, PermissionsMixin):
    user_id = models.AutoField(primary_key=True)
    email = models.EmailField(max_length=50)
    username = models.CharField(max_length=50,unique=True)
    # is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']
    # @property
    # def is_staff(self):
    #     return self.is_admin
    # @property
    # def is_superuser(self):
    #     return self.is_admin
    objects = AppUserManager()
    def __str__(self):
        return self.username
      
# Authentication ends



class Subjects(models.Model):
    subject = models.CharField(max_length=200,null=True)
    semester = models.CharField(max_length=200,null=True)
     
    def __str__(self):
        return self.subject
    

class Faculty(models.Model):
    faculty_name = models.CharField(max_length=200)
    department = models.CharField(max_length=200)
    def __str__(self):
        return self.faculty_name
    
    

class Mapfaculty(models.Model):
    sem = models.IntegerField()
    faculty = models.ForeignKey(Faculty,on_delete=models.CASCADE)
    department = models.CharField(max_length=200)
    subject = models.ForeignKey(Subjects,on_delete=models.CASCADE)
    divison = models.CharField(max_length=200)
    theory = models.IntegerField(default=0)
    practical = models.IntegerField(default=0)
    tutorial = models.IntegerField()
    practical_batch = models.IntegerField()
    tutorial_batch = models.IntegerField()
    year = models.IntegerField(default=datetime.date.today().year)

    def __str__(self):
        return f"Semester {self.sem} Year {self.year}"


class theory_questions(models.Model):
    number = models.IntegerField(primary_key=True)
    question = models.TextField()
    option1 = models.CharField(max_length=200)
    option2 = models.CharField(max_length=200)
    option3 = models.CharField(max_length=200)
    option4 = models.CharField(max_length=200)
    
    def __str__(self):
        return f"Queestion {self.number}"
    
class practical_questions(models.Model):
    number = models.IntegerField(primary_key=True)
    question = models.TextField()
    option1 = models.CharField(max_length=200)
    option2 = models.CharField(max_length=200)
    option3 = models.CharField(max_length=200)
    option4 = models.CharField(max_length=200)
    
    def __str__(self):
        return f"Question {self.number}"
    
    @property
    def name(self):
        return f"Q{self.number}"
    

# print(practical_questions.objects.aggregate(models.Avg("option1")))

class Department(models.Model):
    name = models.CharField(max_length=50)
    def __str__(self):
        return self.name
    
class Calculatedtheory(models.Model):
    faculty = models.ForeignKey(Faculty,on_delete=models.CASCADE)
    subject = models.ForeignKey(Subjects,on_delete=models.CASCADE)
    department = models.CharField(max_length=200)
    division = models.CharField(max_length=5)
    batch = models.IntegerField()
    semester = models.IntegerField()
    f_date = models.IntegerField(default=datetime.date.today().year)
    # for obj in theory_questions.objects.all():
    #     Z = obj.name
    #     X = locals()
    #     X[Z] = models.IntegerField(null=True)

    Q1 = models.IntegerField(null=True)
    Q2 = models.IntegerField(null=True)
    Q3 = models.IntegerField(null=True)
    Q4 = models.IntegerField(null=True)
    Q5 = models.IntegerField(null=True)
    Q6 = models.IntegerField(null=True)
    Q7 = models.IntegerField(null=True)
    Q8 = models.IntegerField(null=True)
    Q9 = models.IntegerField(null=True)
    Q10 = models.IntegerField(null=True)
    Q11 = models.IntegerField(null=True)
    Q12 = models.IntegerField(null=True)

    def __str__(self):
        return f"Claculated Theory : {self.f_date}"
    