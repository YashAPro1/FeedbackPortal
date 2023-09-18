from django.contrib import admin
from . import models as md

# Register your models here.
admin.site.register(md.AppUser)


@admin.register(md.Subjects)
class SubjectAdmin(admin.ModelAdmin):
    list_display = ["id","subject","semester","faculty"]

@admin.register(md.Faculty)
class FacultyAdmin(admin.ModelAdmin):
    list_display = ["id","faculty_name","department"]

@admin.register(md.Mapfaculty)
class MapfacultyAdmin(admin.ModelAdmin):
    list_display = ["id","sem","faculty","department","subject","divison","theory","practical","tutorial","practical_batch","tutorial_batch","year"]
   
@admin.register(md.Department)
class DepartmentAdmin(admin.ModelAdmin):
    list_display = ["id","name"]

admin.site.register(md.theory_questions)


admin.site.register(md.practical_questions)



    