from django.db import models
from operat.models import Faculty,Subjects,practical_questions,theory_questions
# Create your models here.
import datetime
#
### DO not touch all commented code it will be easy for the maintainence in future
#

#Model For the User
# class User(models.Model):
#     UserName = models.CharField(max_length=35)
#     password = models.CharField(max_length=300)
#     def __str__(self):
#         return self.UserName
    

#Model For practical feedback questions
class Practical_feedback(models.Model):
    # user = models.ForeignKey(User,on_delete=models.CASCADE,null=True)
    # faculty = models.ForeignKey(Faculty,on_delete=models.CASCADE)
    # subject = models.ForeignKey(Subjects,on_delete=models.CASCADE)
    user = models.CharField(max_length=200,null=True)
    faculty = models.CharField(max_length=200,null=True)
    subject = models.CharField(max_length=200,null=True)
    department = models.CharField(max_length=200)
    division = models.CharField(max_length=5)
    batch = models.IntegerField()
    semester = models.IntegerField()
    # f_date = models.IntegerField(default=datetime.date.today().year)
    f_date = models.CharField(max_length=200)
    attendence = models.CharField(max_length=30) #its takes only above and below field
    # for obj in practical_questions.objects.all():
    #     Z = obj.name
    #     X = locals()
    #     X[Z] = models.IntegerField()
    Q1 = models.IntegerField(null=True)
    Q2 = models.IntegerField(null=True)
    Q3 = models.IntegerField(null=True)
    Q4 = models.IntegerField(null=True)
    Q5 = models.IntegerField(null=True)
    Q6 = models.IntegerField(null=True)
    Q7 = models.IntegerField(null=True)
    Q8 = models.IntegerField(null=True)
    comment = models.TextField()

    def __str__(self):
        return f"Practical_feedback : {self.id}"
    

#Model For practical feedback questions
class Theory_feedback(models.Model):
    user = models.CharField(max_length=200,null=True)
    faculty = models.CharField(max_length=200,null=True)
    subject = models.CharField(max_length=200,null=True)
    # faculty = models.ForeignKey(Faculty,on_delete=models.CASCADE)
    # subject = models.ForeignKey(Subjects,on_delete=models.CASCADE)
    department = models.CharField(max_length=200)
    division = models.CharField(max_length=5)
    batch = models.IntegerField()
    semester = models.IntegerField()
    # f_date = models.IntegerField(default=datetime.date.today().year)
    f_date = models.CharField(max_length=200)
    attendence = models.CharField(max_length=30)
    # for obj in theory_questions.objects.all():
    #     Z = obj.name
    #     X = locals()
    #     X[Z] = models.IntegerField(null=True)

    Q1 = models.IntegerField(null=True)
    Q2 = models.IntegerField(null=True)
    Q3 = models.IntegerField(null=True)
    Q4 = models.IntegerField(null=True)
    Q5 = models.IntegerField(null=True)
    Q6 = models.IntegerField(null=True)
    Q7 = models.IntegerField(null=True)
    Q8 = models.IntegerField(null=True)
    Q9 = models.IntegerField(null=True)
    Q10 = models.IntegerField(null=True)
    Q11 = models.IntegerField(null=True)
    Q12 = models.IntegerField(null=True)
    comment = models.TextField()

    # def __str__(self):
    #     return f"Theory_feedback : {self.id}"
    

class StudentUser(models.Model):
    username = models.CharField(max_length=30)
    password = models.CharField(max_length=30)
