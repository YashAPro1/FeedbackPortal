
from django.contrib import admin
from django.urls import path
from . import views
urlpatterns = [
    # path('signup/', views.staffSignup,name='signup'),
    path('pracquest/', views.pracquestDetail,name='prac'),
    path('theoryquest/', views.theoryquestDetail,name='theory'),
    path('mapfaculty/', views.mapfacultyDetail,name='Mapfaculty'),
    path('faculty/', views.FacultyDetail,name='faculty'),
    path('subject/', views.SubjectDetail,name='Subject'),
    path('calculate/', views.Calculateavg,name='calculate'),
    path('department/', views.DepartmentDetail,name='department'),
    path("division/", views.DivisionDetail,name="division"),
    #authentication
    path('authenticated/', views.CheckAuthenticatedView.as_view()),
    path('register/', views.UserRegister.as_view(), name='register'),
	path('login/', views.UserLogin.as_view(), name='login'),
	path('logout/', views.UserLogout.as_view(), name='logout'),
    path('csrf_cookie/', views.GetCSRFToken.as_view())
    ##end
]   
