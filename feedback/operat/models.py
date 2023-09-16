from django.db import models
import datetime
# Create your models here.


class Subjects(models.Model):
    subject = models.CharField(max_length=200,null=True)
    semester = models.CharField(max_length=200,null=True)
     
    def __str__(self):
        return self.subject
    

class Faculty(models.Model):
    faculty_name = models.CharField(max_length=200)
    department = models.CharField(max_length=200)
    def __str__(self):
        return self.faculty_name
    
    

class Mapfaculty(models.Model):
    sem = models.IntegerField()
    faculty = models.ForeignKey(Faculty,on_delete=models.CASCADE)
    department = models.CharField(max_length=200)
    subject = models.ForeignKey(Subjects,on_delete=models.CASCADE)
    divison = models.CharField(max_length=200)
    theory = models.IntegerField(default=0)
    practical = models.IntegerField(default=0)
    tutorial = models.IntegerField()
    practical_batch = models.IntegerField()
    tutorial_batch = models.IntegerField()
    year = models.IntegerField(default=datetime.date.today().year)

    def __str__(self):
        return f"Semester {self.sem} Year {self.year}"


class theory_questions(models.Model):
    number = models.IntegerField(primary_key=True)
    question = models.TextField()
    option1 = models.CharField(max_length=200)
    option2 = models.CharField(max_length=200)
    option3 = models.CharField(max_length=200)
    option4 = models.CharField(max_length=200)
    
    def __str__(self):
        return f"Queestion {self.number}"
    
class practical_questions(models.Model):
    number = models.IntegerField(primary_key=True)
    question = models.TextField()
    option1 = models.CharField(max_length=200)
    option2 = models.CharField(max_length=200)
    option3 = models.CharField(max_length=200)
    option4 = models.CharField(max_length=200)
    
    def __str__(self):
        return f"Question {self.number}"
    
    @property
    def name(self):
        return f"Q{self.number}"
    

# print(practical_questions.objects.aggregate(models.Avg("option1")))

class Department(models.Model):
    name = models.CharField(max_length=50)
    def __str__(self):
        return self.name
    
class Calculatedtheory(models.Model):
    faculty = models.ForeignKey(Faculty,on_delete=models.CASCADE)
    subject = models.ForeignKey(Subjects,on_delete=models.CASCADE)
    department = models.CharField(max_length=200)
    division = models.CharField(max_length=5)
    batch = models.IntegerField()
    semester = models.IntegerField()
    f_date = models.IntegerField(default=datetime.date.today().year)
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

    def __str__(self):
        return f"Claculated Theory : {self.f_date}"
    