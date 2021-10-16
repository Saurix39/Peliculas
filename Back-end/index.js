'use strict';
var app = require('./app');
const db = require('./Models/connection');

db.sequelize
  .authenticate()
  .then(() => {
    console.log('Se ha conectado exitosamente con la base de datos');
    db.sequelize.sync()
    const PORT = 3999;
    app.listen(PORT, ()=>{
        console.log("La aplicacion esta corriendo por el puerto 3999")
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
