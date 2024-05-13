DROP TABLE Users;

/* DB CREATION */
  CREATE TABLE Users
(
    ID INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
	Type INT, /* - 0 - for Administrator, - 1 - for users */
	Name NVARCHAR(50),
	Surname NVARCHAR(50),
	UserName nvarchar(50),
    Email NVARCHAR(50),
    Password NVARCHAR(50),
    Phone NVARCHAR(20), 
	Profession NVARCHAR(50),
	Description NVARCHAR(100),
	Place NVARCHAR(80),
	Status INT DEFAULT 0,  /* 0 -> default,   1 -> Open For Work,   2 -> Hiring    */
    Photo VARBINARY(MAX)
);

INSERT INTO Users (Type,Name,Surname,UserName,Email,Password,Phone)
VALUES (0,'Teo','Minaidis','teomin2001','theomin2001@gmail.com','1234!','6979303827'),
       (0,'Dimitris','Rammos','ramoulenios','rammos@gmail.com','1234!','6966969696'),
	   (0,'Clio','Renault','kleioula','kleio@gmail.com','1234!','6966969696');


/* DELETE FROM Users
WHERE ID = 1; */

SELECT TOP (1000) [ID]
	  ,[Type]
	  ,[UserName]
	  ,[Name]
	  ,[Surname]
      ,[Email]
      ,[Password]
      ,[Phone]
      ,[Photo]
	  ,[Profession]
	  ,[Description]
	  ,[Place]
	  ,[Status]
  FROM [UsersDB].[dbo].[Users];
