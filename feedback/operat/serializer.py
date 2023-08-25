from rest_framework import serializers
from . import models
from django.contrib.auth.models import User

#Serializer for all Practical Questions
class pracquestmodelSerializers(serializers.ModelSerializer):
    class Meta:
        model = models.practical_questions
        fields = "__all__"

#Serializer for all theory Questions
class TheorymodelSerializers(serializers.ModelSerializer):
    class Meta:
        model = models.theory_questions
        fields = "__all__"

#Serializer for Mapping all Faculy 
class FacultyMapmodelSerializers(serializers.ModelSerializer):
    class Meta:
        model = models.Mapfaculty
        fields = "__all__"

#Serializer for Faculty
class FacultymodelSerializers(serializers.ModelSerializer):
    class Meta:
        model = models.Faculty
        fields = "__all__"

#Serializer for all Subjects
class SubjectmodelSerializers(serializers.ModelSerializer):
    class Meta:
        model = models.Subjects
        fields = "__all__"