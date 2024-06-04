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
  ('Java', 'Seja bem-vindo ao site de cadastro de alunos, professores e disciplinas.', GETDATE(), 10),
  ('HTML', 'Este site foi desenvolvido como trabalho da disciplina de Desenvolvimento Web.', GETDATE(), 10),
  ('CSS', 'Este site foi desenvolvido como trabalho da disciplina de Desenvolvimento Web.', GETDATE(), 10),
  ('PHP', 'Este site foi desenvolvido como trabalho da disciplina de Desenvolvimento Web.', GETDATE(), 10),
  ('JavaScript', 'Este site foi desenvolvido como trabalho da disciplina de Desenvolvimento Web.', GETDATE(), 10),
  ('MySQL', 'Este site foi desenvolvido como trabalho da disciplina de Desenvolvimento Web.', GETDATE(), 10),
  ('Bootstrap', 'Este site foi desenvolvido como trabalho da disciplina de Desenvolvimento Web.', GETDATE(), 10),
  ('Git', 'Este site foi desenvolvido como trabalho da disciplina de Desenvolvimento Web.', GETDATE(), 10),
  ('GitHub', 'Este site foi desenvolvido como trabalho da disciplina de Desenvolvimento Web.', GETDATE(), 10),
  ('Visual Studio Code', 'Este site foi desenvolvido como trabalho da disciplina de Desenvolvimento Web.', GETDATE(), 10),
  ('XAMPP', 'Este site foi desenvolvido como trabalho da disciplina de Desenvolvimento Web.', GETDATE(), 10),
  ('PHPMyAdmin', 'Este site foi desenvolvido como trabalho da disciplina de Desenvolvimento Web.', GETDATE(), 10),
  ('Apache', 'Este site foi desenvolvido como trabalho da disciplina de Desenvolvimento Web.', GETDATE(), 10),
  ('NetBeans', 'Este site foi desenvolvido como trabalho da disciplina de Desenvolvimento Web.', GETDATE(), 10),
  ('Eclipse', 'Este site foi desenvolvido como trabalho da disciplina de Desenvolvimento Web.', GETDATE(), 10),
  ('Visual Studio', 'Este site foi desenvolvido como trabalho da disciplina de Desenvolvimento Web.', GETDATE(), 10),
  ('Notepad++', 'Este site foi desenvolvido como trabalho da disciplina de Desenvolvimento Web.', GETDATE(), 10),
  ('Notepad', 'Este site foi desenvolvido como trabalho da disciplina de Desenvolvimento Web.', GETDATE(), 10)
END
GO