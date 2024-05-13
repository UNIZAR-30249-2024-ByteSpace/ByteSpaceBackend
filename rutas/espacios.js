var express = require("express");
var router = express.Router();

const ctrlEspacios = require("../controladores/controlador.espacios");

router.get("/", ctrlEspacios.obtenerEspaciosReservables);

router.get("/:id/reserve", ctrlEspacios.verificarReserva);

router.post("/:id", ctrlEspacios.obtenerEspacioPorId);

module.exports =  router;