'use-strict';
const { DataTypes } = require("sequelize");
var db = require("./connection");

const Categoria = db.sequelize.define('categorias',{
    id:{
        type:DataTypes.BIGINT(30),
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    nombre:{
        type:DataTypes.STRING(70)
    }
},
{
    timestamps:false,
    freezeTableName:true
});

module.exports = Categoria;