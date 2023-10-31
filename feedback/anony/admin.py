from django.contrib import admin
from . import models
# Register your models here.

@admin.register(models.Practical_feedback)
class PracticalfeedbackAdmin(admin.ModelAdmin):
    list_display = ["id","user","faculty","subject","department","division","batch","semester","f_date","attendence","Q1","Q2","Q3","Q4","Q5","Q6","Q7","Q8","comment"]

@admin.register(models.Theory_feedback)
class TheoryfeedbackAdmin(admin.ModelAdmin):
    list_display = ["id","user","faculty","subject","department","division","batch","semester","f_date","attendence","Q1","Q2","Q3","Q4","Q5","Q6","Q7","Q8","Q9","Q10","Q11","Q12","comment"]

admin.site.register(models.StudentUser)