const { Router } = require('express');
const { verifyToken } = require('../utils/auth');
const ReservasController = require('../controladores/controlador.reservas');

const router = Router();

// Ruta de inicio de sesión
router.post('/', ReservasController.login);

// Ruta de inicio (home)
router.get('/home', verifyToken, ReservasController.home);

// Ruta de visualización de reservas del usuario
router.get('/misReservas', verifyToken, ReservasController.misReservas);

module.exports = router;
