:: @echo off
::if "%1"=="" (
::  echo Usage: shashx filename.sx
::  exit /b 1
::)

::node "C:\Projects\shashx\main.js" %1
@echo off
node "%~dp0\..\main.js" %*