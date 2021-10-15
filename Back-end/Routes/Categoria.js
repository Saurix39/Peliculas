var express = require('express');
var router = express.Router();
var categoriaController = require("../Controllers/Categoria");

router.post('/categoria',categoriaController.save);
router.get('/categoria',categoriaController.list);
router.get('/filtroCategoria/:search',categoriaController.filtroCategoria);



module.exports = router;