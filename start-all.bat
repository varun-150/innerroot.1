@echo off
echo Starting Inner Root Platform...

echo Starting Spring Boot Backend...
start cmd /k "cd inner-root-backend && mvnw.cmd spring-boot:run"

echo Starting React Frontend...
start cmd /k "cd react-project && npm run dev"

echo All services are starting up!
