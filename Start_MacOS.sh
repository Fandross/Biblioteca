#!/bin/bash

# Inicializa o backend
cd API
dotnet run &

# Aguarda alguns segundos para garantir que o backend esteja iniciado
sleep 5

# Inicializa o frontend
cd ../Frontend/biblioteca-app
npm run dev
