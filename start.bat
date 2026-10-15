@echo off
title Medilink Launcher
echo ========================================================
echo               Starting Medilink System
echo ========================================================
echo.

echo [1/2] Starting Backend Server on port 5050...
start "Medilink Backend Server" cmd /k "cd /d "%~dp0backend" && node server.js"

timeout /t 3 /nobreak >nul

echo [2/2] Starting Frontend Vite Server on port 5173...
start "Medilink Frontend Client" cmd /k "cd /d "%~dp0" && npm run dev"

timeout /t 3 /nobreak >nul

echo Opening browser at http://localhost:5173 ...
start http://localhost:5173

echo.
echo ========================================================
echo Medilink is now running!
echo Frontend: http://localhost:5173
echo Backend:  http://localhost:5050
echo ========================================================
