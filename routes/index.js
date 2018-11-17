var express = require('express');
var router = express.Router();

var db = require('../queries');

router.get('/api/registros', db.getAllRegisters);
router.get('/api/doctores', db.getAllDoctors);
router.get('/api/pacientes', db.getAllPacients);
router.post('/api/registros', db.createRegister);
router.post('/api/doctores', db.createDoctor);
router.post('/api/pacientes', db.createPacient);
router.post('/api/login', db.login);
router.get('/api/lista_p', db.lista_p);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
