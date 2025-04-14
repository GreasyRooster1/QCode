@ECHO OFF
if %1==dev (call :date > ../src/VERSION.txt) else (echo %1 1> ../src/VERSION.txt)

cd ../
npx webpack
exit /b

:date
For /f "tokens=2-4 delims=/ " %%a in ('date /t') do (set mydate=%%c%%a%%b)
For /f "tokens=1-2 delims=/:" %%a in ("%TIME%") do (set mytime=%%a%%b)
echo %1-%mydate%.%mytime%