'use-strict';
const { DataTypes } = require("sequelize");
const Categoria = require("./Categoria");
const Pelicula = require("./Pelicula");
var db = require("./connection");

const pelicula_categoria = db.sequelize.define('pelicula_categoria',{
    id_pelicula_fk:{
        type:DataTypes.BIGINT(30),
        allowNull:false,
        primaryKey:true,
        references:{
            model:Pelicula,
            key:'id'
        }
    },
    id_categoria_fk:{
        type:DataTypes.BIGINT(30),
        allowNull:false,
        primaryKey:true,
        references:{
            model:Categoria,
            key:'id'
        }
    }
},{
    timestamps:false,
    freezeTableName:true
});

Pelicula.belongsToMany(Categoria,{through: pelicula_categoria, foreignKey: 'id_pelicula_fk'});
Categoria.belongsToMany(Pelicula,{through: pelicula_categoria, foreignKey: 'id_categoria_fk'});

module.exports = pelicula_categoria;