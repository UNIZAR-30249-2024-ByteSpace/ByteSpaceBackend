// rutas/reservaRoutes.js
const express = require('express');
const router = express.Router();
const reservaController = require('../Controllers/controlador.reservas');

router.get('/usuario/:id', reservaController.getReservasByUserId);
router.get('/admin', reservaController.getReservasAdmin);
router.delete('/:id', reservaController.cancelReserva);
router.put('/aceptar/:id', reservaController.acceptReserva);
router.post("/:id/reserve", reservaController.crearReserva);

module.exports = router;
