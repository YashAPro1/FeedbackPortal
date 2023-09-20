from rest_framework import serializers
from . import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError

#Authenticaion
from django.contrib.auth import get_user_model, authenticate

UserModel = get_user_model()

#for  user registration
class UserRegisterSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserModel
		fields = '__all__'
	def create(self, clean_data):
		user_obj = UserModel.objects.create_user(email=clean_data['email'], password=clean_data['password'],username=clean_data['username'])
		# user_obj.username = clean_data['username']
		user_obj.save()
		return user_obj

#for user login
class UserLoginSerializer(serializers.Serializer):
	email = serializers.EmailField()
	password = serializers.CharField()
	
	def check_user(self, clean_data):
		user = authenticate(username=clean_data['username'], password=clean_data['password'])
		if not user:
			raise ValidationError('user not found')
		return user

#authentications end


#functions for validators
def onlyoneorzero(value):
    if value!=0 or value!=1:
        raise serializers.ValidationError("It should be either one or zero")

#Serializer for all Practical Questionsx
class pracquestmodelSerializers(serializers.ModelSerializer):
    class Meta:
        model = models.practical_questions
        fields = "__all__"
    def create(self,validate_data):
        return  models.practical_questions.objects.create(**validate_data)

#Serializer for all theory Questions
class TheorymodelSerializers(serializers.ModelSerializer):
    class Meta:
        model = models.theory_questions
        fields = "__all__"
    def create(self,validate_data):
        return  models.theory_questions.objects.create(**validate_data)

#Serializer for Mapping all Faculy 
class FacultyMapmodelSerializers(serializers.ModelSerializer):
    class Meta:
        model = models.Mapfaculty
        fields = "__all__"
        depth=1
    def create(self,validate_data):
        return  models.Mapfaculty.objects.create(**validate_data)
    
    # def update(self,instance,validated_data):
    #     instance.sem = validated_data.get("sem",instance.sem)
    
    def validate_sem(self,value):
        if value>10 or value<1:
            raise serializers.ValidationError("it cannot be greater that 8 or less than 1")
        return value
    
class FacultyMapmodelSerializersC(serializers.ModelSerializer):
    class Meta:
        model = models.Mapfaculty
        fields = "__all__"
    def create(self,validate_data):
        return  models.Mapfaculty.objects.create(**validate_data)
    
    # def update(self,instance,validated_data):
    #     instance.sem = validated_data.get("sem",instance.sem)
    
    def validate_sem(self,value):
        if value>10 or value<1:
            raise serializers.ValidationError("it cannot be greater that 8 or less than 1")
        return value
    
class FacultymodelSerializers(serializers.ModelSerializer):
    class Meta:
        model = models.Faculty
        fields = "__all__"


#Serializer for Faculty
class DepartmentmodelSerializers(serializers.ModelSerializer):
    class Meta:
        model = models.Department
        fields = "__all__"
    def create(self,validate_data):
        return  models.Department.objects.create(**validate_data)

#Serializer for all Subjects
class SubjectmodelSerializers(serializers.ModelSerializer):
    class Meta:
        model = models.Subjects
        fields = "__all__"
    def create(self,validate_data):
        return  models.Subjects.objects.create(**validate_data)

#Model for division 
class DivisionmodelSerializers(serializers.ModelSerializer):
    class Meta:
        model = models.Division
        fields = "__all__"
    def create(self,validate_data):
        return  models.Division.objects.create(**validate_data)