# Generated by Django 4.2.4 on 2023-09-18 09:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('operat', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='subjects',
            name='faculty',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='operat.faculty'),
        ),
    ]