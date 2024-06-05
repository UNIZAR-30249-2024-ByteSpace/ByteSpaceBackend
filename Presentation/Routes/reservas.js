// rutas/reservaRoutes.js
const express = require('express');
const router = express.Router();
const reservaController = require('../Controllers/controlador.reservas');

router.get("/admin", reservaController.getReservasAdmin);

router.get("/:id", reservaController.getReservasByUserId);

router.delete("/:id/cancel", reservaController.cancelReserva);

router.post("/:id/accept", reservaController.acceptReserva);

router.post("/:id/reserve", reservaController.crearReserva);

module.exports = router;
