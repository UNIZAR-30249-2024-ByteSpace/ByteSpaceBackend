var express = require("express");
var router = express.Router();

//const Session = require('../controladores/controlador.sesion.js')

const ctrlUsuario = require('../controladores/controlador.usuario.js')

router.post('/login', ctrlUsuario.iniciarSesion)

module.exports =  router;