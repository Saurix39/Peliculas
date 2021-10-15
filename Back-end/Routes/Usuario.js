'use strict';
var express = require('express');
var router = express.Router();
var usuarioController = require("../Controllers/Usuario");

router.post('/usuario',usuarioController.save);
router.post('/peliculaVista',usuarioController.peliculaVista);
router.get('/peliculasVistas/:id',usuarioController.peliculasVistas);
router.post('/calificarPelicula',usuarioController.calificarPelicula);



module.exports = router;
