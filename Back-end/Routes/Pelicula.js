'use strict';
var express = require('express');
var router = express.Router();
var peliculaController = require("../Controllers/Pelicula");
var multipart = require("connect-multiparty");
var md_upload = multipart({uploadDir:"./uploads/peliculas"});

router.post('/pelicula',peliculaController.save);
router.post('/pelicula-image',md_upload,peliculaController.saveCaratula);
router.get('/caratula/:fileName',peliculaController.caratula);
router.get('/peliculasCategoria',peliculaController.peliculasCategoria);
router.post('/peliculaCategoria',peliculaController.relacionarCategoria);
router.get('/novedad',peliculaController.novedades);
router.get('/peliculas',peliculaController.peliculas);
router.get('/buscar/:search',peliculaController.filtro);
router.get('/calificaciones/:id',peliculaController.getCalificaciones);
router.put('/setImage/:id/:file_name',peliculaController.updateImage);



module.exports = router;