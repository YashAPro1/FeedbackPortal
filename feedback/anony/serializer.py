from rest_framework import serializers
from . import models

class pracfeedbackmodelSerializers(serializers.ModelSerializer):
    class Meta:
        model = models.Practical_feedback
        fields = "__all__"

class theoryfeedbackmodelSerializers(serializers.ModelSerializer):
    class Meta:
        model = models.Theory_feedback
        fields = "__all__"

class UsermodelSerializers(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = "__all__"