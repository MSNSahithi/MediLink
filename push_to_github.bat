@echo off
title Push MedLink to GitHub
echo ========================================================
echo           Pushing MediLink to GitHub
echo   Repository: https://github.com/MSNSahithi/MedLink.git
echo ========================================================
echo.

cd /d "%~dp0Medilink-main" 2>nul || cd /d "%~dp0"

git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================================
    echo  SUCCESS! Your project has been uploaded to GitHub!
    echo  Link: https://github.com/MSNSahithi/MedLink
    echo ========================================================
) else (
    echo.
    echo ========================================================
    echo  If authentication is needed, please complete the sign-in
    echo  prompt or use a Personal Access Token.
    echo ========================================================
)

echo.
pause
