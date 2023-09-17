import django_filters
from . import models


#This is filter class for filtering data in theory_feedback
class TheoryFilter(django_filters.FilterSet):
    class Meta:
        model = models.Theory_feedback
        fields =["user","faculty","subject","department","division"]

#This is filter class for filtering data in practical_feedback
class PracticalFilter(django_filters.FilterSet):
    class Meta:
        model = models.Practical_feedback
        fields =["user","faculty","subject","department","division"]