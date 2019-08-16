--creating the datab
CREATE DATABASE sarym;

--using the database
use sarym;

-- creating a table
/*CREATE TABLE customer (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    address VARCHAR(100) NOT NULL,
    phone VARCHAR(15)
);*/
create table usuario (
    idUsuario INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
    cuitUsuario INT NOT NULL, 
    nombreUsuario VARCHAR(50) NOT NULL, 
    apellidoUsuario VARCHAR(50) NOT NULL, 
    contrasenaUsuario VARCHAR(50) NOT NULL,  
    dniUsuario INT NOT NULL, 
    domicilioUsuario VARCHAR(50) NOT NULL, 
    emailUsuario VARCHAR(50) NOT NULL, 
    idDepartamento INT, 
    nroCelularUsuario INT, 
    nroTelefonoUsuario INT);

create table sarym.departamento(
    idDepartamento INT(5) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
    nombreDepartamento VARCHAR(50) NOT NULL)


-- tp show all tables
SHOW TABLES;

--to describe the table
--describe usuario;


