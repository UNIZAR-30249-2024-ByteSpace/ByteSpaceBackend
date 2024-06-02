// ByteSpaceBackend/adapters/routes/user.js
var express = require("express");
var router = express.Router();

const ctrlUsuario = require('../controladores/controlador.usuario.js')

router.post('/login', ctrlUsuario.iniciarSesion)
router.post('/cambiarRol', ctrlUsuario.cambiarRol)

module.exports =  router;