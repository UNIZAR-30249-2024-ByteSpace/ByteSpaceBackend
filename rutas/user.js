var express = require("express");
var router = express.Router();

//const Session = require('../controladores/controlador.sesion.js')

const UsuarioController = require('../controladores/controlador.usuario.js')

// Crear una instancia del controlador
const usuarioController = new UsuarioController();

router.post('/login', usuarioController.iniciarSesion)
router.post('/cambiarRol', usuarioController.cambiarRol)

module.exports =  router;