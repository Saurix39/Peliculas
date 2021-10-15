'use strict';
var app = require('./app');
const dbConfig = require('./Config/db.config');
const db = require('./Models/connection');

db.sequelize
  .authenticate()
  .then(() => {
    console.log('Se ha conectado exitosamente con la base de datos');
    db.sequelize.sync()
    const PORT = process.env.PORT || 5200;
    app.listen(PORT, ()=>{
        console.log("La aplicacion esta corriendo por el puerto 5200")
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
