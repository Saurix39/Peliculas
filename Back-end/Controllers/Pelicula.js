'use strict'
var validator = require("validator");
var Pelicula = require("../Models/Pelicula");
var Categoria = require("../Models/Categoria");
var pelicula_categoria = require("../Models/pelicula_categoria");
var pelicula_usuario = require("../Models/pelicula_usuario");
const { Op } = require("sequelize");
var moment = require("moment");
var db = require("../Models/connection");
var fs = require('fs');
var path = require('path');

var peliculaController={
    save:function(req,res){
        try{
            var params = req.body;
            var validate_fecha = !validator.isEmpty(params.fecha_estreno);
            var validate_titulo = !validator.isEmpty(params.titulo);
            var validate_descripcion = !validator.isEmpty(params.descripcion);
            var validate_duracion = !validator.isEmpty(params.duracion);
            var validate_trailer = !validator.isEmpty(params.trailer);
        }catch(ex){
            return res.status(400).send({
                status:"error",
                code:400,
                message:"No se han recibido todos los parametros!!"
            });
        }

        if(validate_titulo && validate_descripcion && validate_duracion && validate_trailer && validate_fecha){
            Pelicula.findOne({
                where:{
                    titulo:params.titulo,
                }
            })
            .then((pelicula)=>{
                if(pelicula && pelicula.titulo==params.titulo){
                    return res.status(400).send({
                        status:"error",
                        code:400,
                        message:"Esta pelicula ya ha sido registrada"
                    });
                }else{
                    pelicula = {
                        imagen: null,
                        titulo: params.titulo,
                        descripcion: params.descripcion,
                        duracion: params.duracion,
                        trailer: params.trailer,
                        fecha_estreno: params.fecha_estreno
                    }
                    Pelicula.create(pelicula)
                    .then((pelicula)=>{
                        return res.status(200).send({
                            status:"success",
                            code:200,
                            message:"La pelicula ha sido registrada con exito",
                            pelicula:pelicula
                        });
                    });
                }
            });
        }else{
            return res.status(400).send({
                status:"error",
                code:400,
                message:"Error en la validacion!!"
            });
        }
    },
    saveCaratula:function(req,res){
                var file_name = "archivo no subido";
                if(!req.files){
                    return res.status(400).send({
                        status:"error",
                        message:"No se ha necontrado archivos"
                    });
                }
                var file_path = req.files.file0.path;
                console.log(file_path);
                var file_split = file_path.split('\\');
                var file_name = file_split[2];
                var ext_split = file_name.split('\.');
                var file_ext = ext_split[1];
                //Comprobar la extension
                if(file_ext!="jpg" && file_ext!="png" && file_ext!="jpeg" && file_ext!="gif"){
                    //Si no es valida la extension borrar el archivo subido
                    fs.unlink(file_path,(err)=>{
                        res.status(400).send({
                            status:"error",
                            message:"La extension del archivo no es valida"
                        });
                        
                    })
                }else{ 
                        res.status(200).send({
                            status:"success",
                            message:"Se ha subido la imagen con exito",
                            nombre:file_name
                        });
                } 
    },
    updateImage:function(req,res){
        Pelicula.update({
            imagen:req.params.file_name,
        },{
            where:{
                id:req.params.id
            }
        })
        .then((pelicula)=>{
            res.status(200).send({
                status:"success",
                message:"Se ha actualizado la pelicula con exito",
                pelicula:pelicula
            });
        });
    },
    caratula: function(req,res){
        var file_name=req.params.fileName;
        var path_file='./uploads/peliculas/'+file_name;
        //si el archivo existe
        if(fs.existsSync(path_file)){
            return res.sendFile(path.resolve(path_file));
        }else{
            return res.status(400).send({
                status:"error",
                code:400,
                message:"No existe el avatar"
            });   
        }
    },
    peliculasCategoria(req,res){
        db.sequelize.query('select peliculas.id , peliculas.imagen, peliculas.titulo, peliculas.descripcion, peliculas.duracion,peliculas.trailer,peliculas.fecha_estreno,  categorias.nombre from peliculas inner join pelicula_categoria on peliculas.id = id_pelicula_fk inner join categorias on categorias.id = id_categoria_fk order by id_categoria_fk')
        .then((result,metadata)=>{
            return res.status(200).send({
                status:"success",
                code:200,
                valores:result[0],
                message:"Datos obtenidos con exito!!"
            });
        });

    },
    relacionarCategoria:function(req,res){
        var params = req.body;
        try{
            var validate_pelicula = !validator.isEmpty(params.id_pelicula_fk);
            var validate_categoria = !validator.isEmpty(params.id_categoria_fk);
        }catch(ex){
            return res.status(400).send({
                status:"error",
                code:400,
                message:"No se recibieron los datos completos"
            }); 
        }
        if(validate_pelicula && validate_categoria){
            pelicula_categoria.findOne({
                where:{
                    id_categoria_fk:params.id_categoria_fk,
                    id_pelicula_fk:params.id_pelicula_fk
                }
            })
            .then((registro)=>{
                if(registro && registro.id_pelicula_fk == params.id_pelicula_fk && registro.id_categoria_fk == params.id_categoria_fk){
                    return res.status(400).send({
                        status:"error",
                        code:400,
                        message:"Este registro ya existe"
                    }); 
                }else{
                    registro={
                        id_pelicula_fk:params.id_pelicula_fk,
                        id_categoria_fk:params.id_categoria_fk
                    }
                    pelicula_categoria.create(registro)
                    .then((registro)=>{
                        return res.status(200).send({
                            status:"success",
                            code:200,
                            message:"Se ha registrado de manera correcta",
                            result:registro
                        }); 
                    });
                }
            });
        }else{
            return res.status(400).send({
                status:"error",
                code:400,
                message:"Validacion fallida"
            });
        }
    },
    novedades: function(req,res){
        var startDate = moment();
        startDate = startDate.subtract(21,'days');
        //startDate = moment("YYYY-MM-DD");
        var endDate = moment();
        //startDate = moment("YYYY-MM-DD");
        Pelicula.findAll({
            where:{
                fecha_estreno:{
                    [Op.between]: [
                        startDate,
                        endDate
                       ]
                }
            }
        })
        .then((list)=>{
            return res.status(200).send({
                status:"success",
                code:200,
                message:"Se han consultado novedades con exito",
                list:list
            });
        });
    },
    peliculas:function(req,res){
        Pelicula.findAll()
        .then((list)=>{
            return res.status(200).send({
                status:"success",
                code:200,
                message:"Listado de peliculas exitoso",
                list:list
            });
        });
    },
    filtro:function(req,res){
        var search = req.params.search;
        Pelicula.findAll({
            where:{
                [Op.or]:[
                    {
                        titulo:{
                            [Op.like]:'%'+search+'%'
                        }
                    }
                ]
            }
        })
        .then((list)=>{
            return res.status(200).send({
                status:"success",
                code:200,
                message:"Listado de peliculas exitoso",
                list:list
            });
        });
    },
    getCalificaciones:function(req,res){
        var id = req.params.id; 
        pelicula_usuario.findAll({
            where:{
                id_pelicula_fk:id,
                calificacion:{
                    [Op.ne]:null
                }
            },
            attributes:['calificacion']
        })
        .then((list)=>{
            return res.status(200).send({
                status:"success",
                code:200,
                message:"Calificaciones obtenidas con exito",
                list:list
            });
        });
    }
}

module.exports = peliculaController;