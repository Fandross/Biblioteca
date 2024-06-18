# Biblioteca Sistema Distruibuido
 Trabalho de Sistema Distribuido

# Como usar:
1)
 - Instale o .Net 8.0 com sdk 8.0.302
 - Clone o repositório
 - Entre na pasta /API, digite no terminal 'dotnet run' para startar o backend
 - Entre na pasta /Frontend/biblioteca-app/ digite em um novo terminal 'npm install', após instalação digite 'npm run dev' para startar o frontend

2)
 - Segue o Esquema do banco de dados incial para a database inicial, 'bibliotecadb', senha rootrootroot, ou mude no arquivo /API/appsettings.json:

  - Crie a DATABASE BibliotecaDB
  - Selecionar o banco de dados
    - USE BibliotecaDB;

  - Tabela Estudantes:
    CREATE TABLE Estudantes (
        Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        Nome VARCHAR(100) NOT NULL,
        Matricula VARCHAR(50) NOT NULL
    );

  - Tabela Livros:
    CREATE TABLE Livros (
        Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        Titulo VARCHAR(200) NOT NULL,
        Autor VARCHAR(100) NOT NULL,
        Isbn VARCHAR(20),
        Descricao VARCHAR(500),
        Genero VARCHAR(100),
        Quantidade INT NOT NULL
    );

  - Tabela de Junção Estudante_Livro:
    CREATE TABLE Estudante_Livro (
        EstudanteId INT NOT NULL,
        LivroId INT NOT NULL,
        PRIMARY KEY (EstudanteId, LivroId),
        FOREIGN KEY (EstudanteId) REFERENCES Estudantes(Id),
        FOREIGN KEY (LivroId) REFERENCES Livros(Id)
    );

3) Preencher a tabela com exemplos de teste:
  - Inserindo 10 exemplos de livros na tabela Livros
    INSERT INTO Livros (Titulo, Autor, Isbn, Descricao, Quantidade, Genero)
    VALUES 
        ('Dom Casmurro', 'Machado de Assis', '978-85-278-0029-2', 'Clássico da literatura brasileira.', 5, 'Romance'),
        ('1984', 'George Orwell', '978-0-452-28423-4', 'Distopia política que descreve um governo totalitário.', 8, 'Ficção Científica'),
        ('O Hobbit', 'J.R.R. Tolkien', '978-0-261-10236-0', 'Aventura de um hobbit em busca de um tesouro guardado por um dragão.', 3, 'Fantasia'),
        ('Orgulho e Preconceito', 'Jane Austen', '978-0-14-143951-8', 'Romance que critica a sociedade inglesa do século XIX.', 6, 'Romance'),
        ('A Revolução dos Bichos', 'George Orwell', '978-0-141-18236-7', 'Sátira política que critica regimes totalitários.', 4, 'Fábula'),
        ('A Arte da Guerra', 'Sun Tzu', '978-0-00-742012-4', 'Tratado militar e estratégico.', 10, 'Filosofia militar'),
        ('Cem Anos de Solidão', 'Gabriel García Márquez', '978-85-359-1084-1', 'Realismo mágico na narrativa de uma família.', 7, 'Realismo Mágico'),
        ('Crime e Castigo', 'Fiódor Dostoiévski', '978-85-01-01266-4', 'Estudo psicológico sobre culpa e redenção.', 9, 'Romance Psicológico'),
        ('A Metamorfose', 'Franz Kafka', '978-85-08-11111-5', 'Novela que narra a transformação de um homem em um inseto.', 2, 'Ficção Absurda'),
        ('O Senhor dos Anéis', 'J.R.R. Tolkien', '978-85-359-0221-7', 'Aventura épica em um mundo fantástico.', 5, 'Fantasia'); 

3) Inicialização rápida:
  - Depois de Clonar o repositório e configurar o mysql no /API/appsettings.json, execute o arquivo Start_Windows.bat para iniciar as duas aplicações
  - Caso no MacOS, navegue até a pasta Biblioteca: 
    - Execute no terminal o comando para dar permissão para executar:
      - 'chmod +x Start_MacOS.sh'
    - Execute o programa no terminal: 
      - './Start_MacOS.sh' 
