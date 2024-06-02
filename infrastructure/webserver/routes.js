const express = require('express');
const router = express.Router();

const spacesRouter = require('../../interfaces/controllers/EspacioController');
const reserveRouter = require('../../interfaces/controllers/ReservaController');
const usersRouter = require('../../interfaces/controllers/UsuarioController');

router.use('/users', usersRouter);
router.use('/reserve', reserveRouter);
router.use('/spaces', spacesRouter);

module.exports = router;
