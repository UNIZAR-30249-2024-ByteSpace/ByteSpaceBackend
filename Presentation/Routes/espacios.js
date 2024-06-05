var express = require("express");
var router = express.Router();

const ctrlEspacios = require("../Controllers/controlador.espacios");

router.get("/", ctrlEspacios.obtenerEspaciosReservables);

router.get('/search', ctrlEspacios.filtrarEspacios);

router.get("/:id", ctrlEspacios.obtenerEspacioPorId);

router.post("/actualizarEspacio", ctrlEspacios.actualizarEspacio);

module.exports =  router;