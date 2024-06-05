var express = require("express");
var router = express.Router();

//const Session = require('../controladores/controlador.sesion.js')

const UsuarioController = require('../controladores/controlador.usuario.js')


router.post('/login', UsuarioController.iniciarSesion)
router.post('/cambiarRol', UsuarioController.cambiarRol)

module.exports =  router;