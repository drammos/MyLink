@echo off
setlocal

:: Start the API server
start "API Server" cmd /k "cd /d backend\ServerAPI && npm start"

:: Build the website
cd /d frontent\linkedin
npm run build

:: Start the website
start "Website" cmd /k "cd /d frontend\linkedin && npm start"

endlocal