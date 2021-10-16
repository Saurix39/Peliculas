'use strict';
const express = require("express");
const app = express();
var usuarioRoutes = require("./Routes/Usuario");
var peliculaRoutes = require("./Routes/Pelicula");
var categoriaRoutes = require("./Routes/Categoria");

// para peticiones content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
// para peticiones content type - application/json
app.use(express.json());
//CORS
// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use('/api',usuarioRoutes);
app.use('/api',peliculaRoutes);
app.use('/api',categoriaRoutes);



module.exports = app;