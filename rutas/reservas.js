var express = require("express");
var router = express.Router();

const ctrlReservas = require("../controladores/controlador.reservas");

router.get("/:id", ctrlReservas.getReservasByUserId);

router.delete("/:id/cancel", ctrlReservas.cancelReserva);

module.exports =  router;