var promise = require('bluebird');

var options = {
	promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://postgres:1234@localhost:5432/arqui2';
var db = pgp(connectionString);
var jwt = require("jsonwebtoken");

module.exports = {
	getAllRegisters: getAllRegisters,
	getAllDoctors: getAllDoctors,
	getAllPacients: getAllPacients,
	createRegister: createRegister,
	createDoctor: createDoctor,
	createPacient: createPacient,
	login: login,
	lista_p: lista_p
};

function lista_p(req, res, next) {
	db.any('SELECT * FROM Paciente ' +
	'WHERE usuario = \'' + req.body["usuario"] + '\'' + 
	'AND pass = \'' + req.body["pass"] + '\'')
		.then(function (data) {
		res.status(200)
        .json({
          status: 'Exito',
		  data: data,
          message: 'Login exitoso'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function login(req, res, next) {
	console.log(req.body);
	db.any('SELECT * FROM Doctor ' +
	'WHERE usuario = \'' + req.body["usuario"] + '\'' + 
	'AND pass = \'' + req.body["pass"] + '\'')
		.then(function (data) {
		res.status(200)
        .json({
          status: 'Exito',
		  data: data,
          message: 'Login exitoso'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getAllRegisters(req, res, next) {
	db.any('SELECT d.nombre AS Doctor, p.nombre AS Paciente, dp.ts AS Timestamp ' +
	'FROM Doctor d, Paciente p, Doctor_Paciente dp ' +  
	'WHERE d.id_doctor = dp.doctor_id_doctor AND p.id_paciente = dp.paciente_id_paciente')
		.then(function (data) {
		  res.status(200)
			.json({
			  status: 'Exito',
			  data: data,
			  message: 'Todos los datos obtenidos'
			});
		})
    .catch(function (err) {
      return next(err);
    });
}

function getAllDoctors(req, res, next) {
	db.any('SELECT nombre AS Doctor, usuario AS Usuario, correo AS Correo FROM Doctor')
		.then(function (data) {
		  res.status(200)
			.json({
			  status: 'Exito',
			  data: data,
			  message: 'Todos los doctores obtenidos'
			});
		})
    .catch(function (err) {
      return next(err);
    });
}

function getAllPacients(req, res, next) {
	db.any('SELECT * FROM Paciente')
		.then(function (data) {
		  res.status(200)
			.json({
			  status: 'Exito',
			  data: data,
			  message: 'Todos los pacientes obtenidos'
			});
		})
    .catch(function (err) {
      return next(err);
    });
}

function createRegister(req, res, next) {
	db.none('INSERT INTO doctor_paciente(Doctor_id_doctor, Paciente_id_paciente, TS) VALUES' +
		'((SELECT doctor.id_doctor ' +
		'FROM doctor ' +
		'WHERE doctor.nombre = $<doctor>), ' +
		'(SELECT paciente.id_paciente ' +
		'FROM paciente ' +
		'WHERE paciente.nombre = $<paciente>), Now());' ,
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'Exito',
          message: 'Añadido un registro'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createDoctor(req, res, next) {
	db.none('INSERT INTO Doctor (nombre, usuario, pass, correo, foto) ' +
		'VALUES ($<nombre>, $<usuario>, $<pass>, $<correo>, $<foto>)' ,
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'Exito',
          message: 'Añadido un doctor'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createPacient(req, res, next) {
	db.none('INSERT INTO Paciente (nombre, usuario, pass, correo, foto, direccion, sexo, fecha_nac) ' +
		'VALUES ($<nombre>, $<usuario>, $<pass>, $<correo>, $<foto>, $<direccion>, $<sexo>, $<fecha_nac>)' ,
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'Exito',
          message: 'Añadido un paciente'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}