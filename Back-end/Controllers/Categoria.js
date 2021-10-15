'use strict'
var validator = require("validator");
var Categoria = require("../Models/Categoria");
var Pelicula = require("../Models/Pelicula");
const { Op } = require("sequelize");

var categoriaController={
    save:function(req,res){
        var params = req.body
        try{
            var validate_nombre = !validator.isEmpty(params.nombre);
        }catch(ex){
            return res.status(400).send({
                status:"error",
                code:400,
                message:"No se han recibido los parametros"
            });
        }
        if(validate_nombre){
            Categoria.findOne({
                where:{
                    nombre:params.nombre
                }
            })
            .then((categoria)=>{
                if(categoria && categoria.nombre == params.nombre){
                    return res.status(400).send({
                        status:"error",
                        code:400,
                        message:"Esta categoria ya existe"
                    });
                }else{
                    categoria={
                        nombre:params.nombre
                    }
                    Categoria.create(categoria)
                    .then((categoria)=>{
                        return res.status(200).send({
                            status:"success",
                            code:200,
                            message:"Categoria creada con exito",
                            categoria:categoria
                        });
                    });
                }
            })
        }else{
            return res.status(400).send({
                status:"error",
                code:400,
                message:"Error en la validacion"
            });
        }
    },
    list:function(req,res){
        Categoria.findAll()
        .then((list)=>{
            return res.status(200).send({
                status:"success",
                code:200,
                message:"Listado de categorias creado con exito",
                list:list
            });
        });
    },
    filtroCategoria:function(req,res){
        var search = req.params.search;
        Categoria.findAll({
            include:[Pelicula],
            where:{
                nombre:{
                    [Op.like]:'%'+search+'%'
                }
            }
        })
        .then((list)=>{
            return res.status(200).send({
                status:"success",
                code:200,
                message:"Listado de peliculas por categorias obtenido con exito",
                list:list
            });
        });
    }
}

module.exports = categoriaController;