# Generated by Django 4.2.1 on 2023-05-26 04:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shyftcourse', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='shyftcourse',
            name='isdeleted',
            field=models.BooleanField(default=False),
        ),
    ]
