# Biblioteca Sistema Distruibuido
 Trabalho de Sistema Distribuido

# Como usar:
1)
 - Clone o repositório
 - Entre na pasta /API, digite no terminal 'dotnet run' para startar o backend
 - Entre na pasta /Frontend/biblioteca-app/ digite em um novo terminal 'npm install', após instalação digite 'npm run dev' para startar o frontend

2)
 - Segue o Esquema do banco de dados incial para a database, 'bibliotecadb', senha rootrootroot, ou mude no arquivo /API/appsettings.json:
  - Livro{
    - id	integer($int32)
    - titulo	string nullable: true
    - autor	string nullable: true
    - isbn	string nullable: true
    - descricao	string nullable: true
    - quantidade	integer($int32)
    - genero	string nullable: true
   } 

3) Inicialização rápida:
  - Depois de Clonar o repositório e configurar o mysql no /API/appsettings.json, execute o arquivo Start_Windows.bat para iniciar as duas aplicações
  - Caso no MacOS, navegue até a pasta Biblioteca: 
    - Execute no terminal o comando para dar permissão para executar:
      - 'chmod +x Start_MacOS.sh'
    - Execute o programa no terminal: 
      - './Start_MacOS.sh' 
