# Faculty Feedback System - Django Rest Framework And ReactJS Project

Project Logo

## Table of Contents

Description
Features
Installation
Usage
Contributing  
License
Description
The Faculty Feedback System is a web-based Django project designed to streamline and improve the process of collecting feedback from students about their instructors. This project allows educational institutions to efficiently gather valuable feedback from students, helping to enhance the overall teaching and learning experience.

##Features
User Authentication: Secure user authentication and authorization system for students, instructors, and administrators.

Student Feedback: Students can provide feedback on various aspects of their courses and instructors, including teaching methods, course content, and communication.

Instructor Management: Faculty members can view their feedback and make improvements based on the received feedback.

Administrative Dashboard: Administrators have access to a powerful dashboard to manage users, courses, and feedback reports.

Feedback Analysis: The system provides data visualization tools to help analyze feedback and identify areas for improvement.

Email Notifications: Automated email notifications for students and instructors to remind them to provide feedback.

Customizable: Easily customizable to fit the specific needs and branding of your educational institution.

##Installation
Follow these steps to set up the Faculty Feedback System on your local machine:

### Clone the repository:

```shell
git clone https://github.com/yourusername/FacultyFeedback.git
cd FacultyFeedback
```

### Create a virtual environment (optional but recommended):

```shell
python -m venv venv
source venv/bin/activate # On Windows, use: venv\Scripts\activate
```

### Install the project dependencies:

```shell
pip install -r requirements.txt
```

### Create a .env file in the project root and configure your environment variables:

```shell
SECRET_KEY=your_secret_key
DEBUG=True
DATABASE_URL=your_database_url
```

### Add other necessary environment variables

#### Apply database migrations:

```shell
python manage.py migrate
Create a superuser account to access the admin panel:
```

```shell
python manage.py createsuperuser
Start the development server:
```

```shell
python manage.py runserver
```

Access the application in your web browser at http://localhost:8000.

## Usage

Administrator Access: Log in to the admin panel using the superuser account you created. From here, you can manage users, courses, and view feedback reports.

Student Feedback: Students can log in to the system and provide feedback on their courses and instructors. They will receive email reminders to complete the feedback process.

Instructor Dashboard: Faculty members can log in to view feedback from students and make improvements based on the received feedback.

Feedback Analysis: Utilize the data visualization tools and reports available in the administrator panel to analyze feedback and make data-driven decisions.

License
This project is licensed under the MIT License.
