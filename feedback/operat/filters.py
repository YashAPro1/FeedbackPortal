import django_filters
from . import models


#This is filter class for filtering data in subject
class SubjectsFilter(django_filters.FilterSet):
    class Meta:
        model = models.Subjects
        fields =["semester", "department"]

#This is filter class for filtering data in faculty
class FacultyFilter(django_filters.FilterSet):
    class Meta:
        model = models.Faculty
        fields =["faculty_name","department"]

#This is filter class for filtering data in Mapfaculty
class MapfacultyFilter(django_filters.FilterSet):
    class Meta:
        model = models.Mapfaculty
        fields =["department","divison","faculty","subject"]

#This is filter class for filtering data in theory_questions
class TheoryQuestionFilter(django_filters.FilterSet):
    class Meta:
        model = models.theory_questions
        fields =["number"]

#This is filter class for filtering data in practical_questions
class PracticalQuestionFilter(django_filters.FilterSet):
    class Meta:
        model = models.practical_questions
        fields =["number"]

#This is filter class for filtering data in Department
class DepartmentFilter(django_filters.FilterSet):
    class Meta: 
        model = models.Department
        fields =["name"]


