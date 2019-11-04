USE M_Roman;
GO;

INSERT INTO Temas VALUES('HQ')
INSERT INTO Temas VALUES('Esportes')
GO

INSERT INTO Professores VALUES ('Erik Vitelli','erik@email.com','123456')
INSERT INTO Professores VALUES ('Helena Strada','helena@email.com','123456')
GO

INSERT INTO Projetos (IdProfessor,IdTema,Nome) VALUES(1,1,'Projeto de listagem');
INSERT INTO Projetos (IdProfessor,IdTema,Nome) VALUES(2,2,'Projeto de cadastro');
INSERT INTO Projetos (IdProfessor,IdTema,Nome) VALUES(1,2,'Projeto de atualizar');
GO


