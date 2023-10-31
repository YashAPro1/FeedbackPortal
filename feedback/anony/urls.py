
from django.contrib import admin
from django.urls import path, include

from . import views

urlpatterns = [
    # path('ffeedback/',views.anonySignup,name="signup"),
    path('theory_feedback/',views.TheoryFeedback,name="theoryfeedbck"),
    path('pract_feedback/',views.PracticalFeedback,name="practicalfeedbck"),
    path('user/',views.senduser,name="user"),
    # path('userlogin/',views.UserLogin,name="login"),
    # path('usersignup/',views.usersignUp,name="signup"),
]
