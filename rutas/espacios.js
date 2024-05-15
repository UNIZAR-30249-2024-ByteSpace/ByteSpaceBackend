var express = require("express");
var router = express.Router();

const ctrlEspacios = require("../controladores/controlador.espacios");

router.get("/", ctrlEspacios.obtenerEspaciosReservables);

router.post("/:id/reserve", ctrlEspacios.crearReserva);

router.get('/search', ctrlEspacios.filtrarEspacios);

router.get("/:id", ctrlEspacios.obtenerEspacioPorId);

module.exports =  router;