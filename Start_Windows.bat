@echo off

REM Inicializa o backend
cd API
start dotnet run

REM Aguarda alguns segundos para garantir que o backend esteja iniciado
timeout /t 5

REM Inicializa o frontend
cd ../Frontend/biblioteca-app
start npm run dev
