# Generated by Django 4.2.4 on 2023-08-22 17:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('operat', '0005_questions'),
    ]

    operations = [
        migrations.AlterField(
            model_name='questions',
            name='question',
            field=models.TextField(),
        ),
    ]
