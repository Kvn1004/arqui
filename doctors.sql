DROP DATABASE IF EXISTS arqui2;
CREATE DATABASE arqui2;

\c arqui2;

CREATE TABLE Doctor (
	id_doctor 	SERIAL PRIMARY KEY,
	nombre 		VARCHAR(50) NOT NULL,
	usuario		VARCHAR(50) NOT NULL,
	pass		VARCHAR(50) NOT NULL,
	correo 		VARCHAR(50) NOT NULL,
	foto		VARCHAR(200)
);


CREATE TABLE Paciente (
	id_paciente 	SERIAL PRIMARY KEY,
	nombre 			VARCHAR(50) NOT NULL,
	usuario			VARCHAR(50) NOT NULL,
	pass  			VARCHAR(50) NOT NULL,
	correo			VARCHAR(50) NOT NULL,
	foto			VARCHAR(200) NOT NULL,
	direccion		VARCHAR(100) NOT NULL,
	sexo			VARCHAR(50) NOT NULL,
	fecha_nac		DATE NOT NULL
);


CREATE TABLE Doctor_Paciente (
	Doctor_id_doctor 		int4 REFERENCES Doctor(id_doctor),
	Paciente_id_paciente 	int4 REFERENCES Paciente(id_paciente),
	TS						TIMESTAMP NOT NULL
	/*Frecuencia				INTEGER NOT NULL,
	SPO2					INTEGER NOT NULL*/
);