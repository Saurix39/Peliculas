'use-strict';
const { DataTypes } = require("sequelize");
var db = require("./connection");

const Pelicula = db.sequelize.define('peliculas',{
    id:{
        type:DataTypes.BIGINT(30),
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    imagen:{
        type:DataTypes.STRING(100)
    },
    titulo:{
        type:DataTypes.STRING(50)
    },
    descripcion:{
        type:DataTypes.TEXT
    },
    duracion:{
        type:DataTypes.STRING(50)
    },
    trailer:{
        type:DataTypes.STRING(250)
    },
    fecha_estreno:{
        type:DataTypes.DATE
    }
},
{
    timestamps:false,
    freezeTableName:true
});


module.exports = Pelicula;