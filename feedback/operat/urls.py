
from django.contrib import admin
from django.urls import path
from . import views
urlpatterns = [
    path('signup/', views.staffSignup,name='signup'),
    path('pracquest/', views.pracquestDetail,name='prac'),
    path('theoryquest/', views.theoryquestDetail,name='theory'),
    path('mapfaculty/', views.mapfacultyDetail,name='Mapfaculty'),
    path('faculty/', views.FacultyDetail,name='faculty'),
    path('subject/', views.SubjectDetail,name='Subject'),
    path('calculate/', views.Calculateavg,name='calculate'),
]
