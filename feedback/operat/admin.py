from django.contrib import admin
from . import models

# Register your models here.

admin.site.register(models.Subjects)
admin.site.register(models.Faculty)
admin.site.register(models.Mapfaculty)
admin.site.register(models.theory_questions)
admin.site.register(models.practical_questions)
    