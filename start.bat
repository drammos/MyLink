@echo off
setlocal

:: Start the API server
:: start "API Server" cmd /k "cd /d backend\ServerAPI && npm start"

dir
:: Start the website
start "Website" cmd /k "cd /d MyLinkFrontEnd && npm start"

:: Build the website
cd /d MyLinkFrontEnd
npm run build

endlocal