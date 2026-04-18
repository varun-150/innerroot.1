@echo off
echo Starting Django Auth Service...
start cmd /k "cd django-auth-service && .\venv\Scripts\python.exe manage.py runserver"

echo Starting React Frontend...
start cmd /k "cd react-project && npm run dev"

echo All services are starting up!
