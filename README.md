# Biblioteca Sistema Distruibuido
 Trabalho de Sistema Distribuido

# Como usar:
1)
 - Clone o repositório
 - Entre na pasta /API, digite no terminal 'dotnet run' para startar o backend
 - Entre na pasta /Frontend/biblioteca-app/ digite em um novo terminal 'npm install', após instalação digite 'npm run dev' para startar o frontend

2)
 - Segue o Esquema do banco de dados incial para a database, 'bibliotecadb':
Livro{
 id	integer($int32)
 titulo	string nullable: true
 autor	string nullable: true
 isbn	string nullable: true
 descricao	string nullable: true
 quantidade	integer($int32)
 genero	string nullable: true
} 
