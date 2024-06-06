IF NOT EXISTS (SELECT name FROM master.dbo.sysdatabases WHERE name = N'backend-db')
  CREATE DATABASE [backend-db]
GO

USE [backend-db];
GO

IF NOT EXISTS (select * from sysobjects where name='courses' and xtype='U')
BEGIN
  CREATE TABLE courses (
  Id INT NOT NULL IDENTITY,
  Title TEXT NOT NULL,
  Description TEXT,
  CreatedAt DATETIME NOT NULL,
  Hours INT,
  PRIMARY KEY (Id)
  );

  INSERT INTO [courses] (Title, Description, CreatedAt, Hours)
  VALUES 
  ('Java', 'Aprenda Java, uma linguagem de programação versátil e amplamente utilizada. Ideal para construir aplicações robustas, seguras e portáteis.', GETDATE(), 10),
  ('HTML', 'Domine o HTML, a linguagem de marcação padrão para a criação de páginas web. Um bloco de construção fundamental do desenvolvimento web.', GETDATE(), 10),
  ('CSS', 'Pratique CSS, uma linguagem de folha de estilo usada para descrever a aparência e a formatação de um documento escrito em HTML.', GETDATE(), 10),
  ('PHP', 'Mergulhe no PHP, uma linguagem de script do lado do servidor popular projetada para desenvolvimento web, mas também usada como linguagem de programação de propósito geral.', GETDATE(), 10),
  ('JavaScript', 'Explore o JavaScript, uma linguagem de programação de alto nível e interpretada que é uma tecnologia central da World Wide Web.', GETDATE(), 10),
  ('MySQL', 'Aprenda MySQL, um sistema de gerenciamento de banco de dados que usa SQL como interface. É um dos bancos de dados mais populares do mundo.', GETDATE(), 10),
  ('Bootstrap', 'Conheça o Bootstrap, um framework de código aberto para desenvolvimento com HTML, CSS e JS. Desenvolva sites responsivos, móveis primeiro, na web com a biblioteca de componentes front-end mais popular do mundo.', GETDATE(), 10),
  ('Git', 'Aprenda Git, um sistema de controle de versão distribuído que permite rastrear mudanças no código fonte durante o desenvolvimento de software.', GETDATE(), 10),
  ('GitHub', 'Explore o GitHub, uma plataforma de hospedagem de código-fonte com controle de versão usando o Git. É onde mais de 65 milhões de desenvolvedores moldam o futuro do software, juntos.', GETDATE(), 10),
  ('Visual Studio Code', 'Domine o Visual Studio Code, um editor de código-fonte desenvolvido pela Microsoft para Windows, Linux e macOS. Ele inclui suporte para depuração, controle Git incorporado, realce de sintaxe, complementação inteligente de código, snippets e refatoração de código.', GETDATE(), 10),
  ('XAMPP', 'Aprenda XAMPP, uma distribuição Apache de código aberto que fornece aos desenvolvedores um servidor web fácil de instalar.', GETDATE(), 10),
  ('PHPMyAdmin', 'Conheça o PHPMyAdmin, uma ferramenta de software livre escrita em PHP, destinada a lidar com a administração do MySQL pela Web.', GETDATE(), 10),
  ('Apache', 'Explore o Apache, o servidor web mais popular do mundo. Ele é um projeto de código aberto mantido pela Apache Software Foundation.', GETDATE(), 10),
  ('NetBeans', 'Aprenda NetBeans, um ambiente de desenvolvimento integrado (IDE) para desenvolvimento de software. Ele permite que os aplicativos sejam desenvolvidos a partir de um conjunto de módulos de software chamados módulos.', GETDATE(), 10),
  ('Eclipse', 'Domine o Eclipse, um ambiente de desenvolvimento integrado (IDE) usado no desenvolvimento de programas de computador. É o IDE mais amplamente utilizado para desenvolvimento Java.', GETDATE(), 10),
  ('Visual Studio', 'Aprenda Visual Studio, um ambiente de desenvolvimento integrado (IDE) da Microsoft. Ele é usado para desenvolver programas de computador, bem como sites, aplicativos da web, serviços da web e aplicativos móveis.', GETDATE(), 10),
  ('Notepad++', 'Conheça o Notepad++, um editor de texto e de código-fonte com suporte a várias linguagens. Ele busca reduzir o uso de energia mundial ao ter uma execução mais eficiente e reduzindo a carga da CPU, resultando em um ambiente mais verde.', GETDATE(), 10),
  ('Notepad','Aprenda sobre o Notepad, um simples editor de texto que é incluído em todas as versões do Microsoft Windows. Ele é usado para criar, abrir e ler arquivos de texto sem formatação.', GETDATE(), 10)
END
GO