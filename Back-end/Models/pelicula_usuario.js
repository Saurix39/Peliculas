'use-strict';
const { DataTypes } = require("sequelize");
const Pelicula = require("./Pelicula");
const Usuario = require("./Usuario");
var db = require("./connection");


const pelicula_usuario = db.sequelize.define('pelicula_usuario',{
    id_pelicula_fk:{
        type:DataTypes.BIGINT(30),
        allowNull:false,
        primaryKey:true,
        references:{
            model:Pelicula,
            key:'id'
        }
    },
    id_usuario_fk:{
        type:DataTypes.BIGINT(30),
        allowNull:false,
        primaryKey:true,
        references:{
            model:Usuario,
            key:'id'
        }
    },
    calificacion:{
        type:DataTypes.INTEGER(2),
        allowNull:true
    },
    vista:{
        type:DataTypes.INTEGER(1),
        allowNull:true
    }
},{
    timestamps:false,
    freezeTableName:true
});

Usuario.belongsToMany(Pelicula,{through: pelicula_usuario,foreignKey: 'id_usuario_fk'});
Pelicula.belongsToMany(Usuario,{through: pelicula_usuario,foreignKey: 'id_pelicula_fk'});

module.exports = pelicula_usuario;