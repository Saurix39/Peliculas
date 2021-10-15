'use strict'
var validator = require("validator");
var Usuario = require("../Models/Usuario");
var pelicula_usuario = require("../Models/pelicula_usuario");
const { param } = require("../Routes/Usuario");
var usuarioController={
    save:function(req,res){
        var params = req.body;
        try{
            var validate_nombre = !validator.isEmpty(params.nombre);
        }catch(ex){
            return res.status(400).send({
                status:"error",
                code:400,
                message:"No se han recibido todos los valores"
            });
        }
        if(validate_nombre){
            Usuario.findOne({
                where:{
                    nombre:params.nombre
                }
            })
            .then((usuario)=>{
                if(usuario && usuario.nombre == params.nombre){
                    return res.status(400).send({
                        status:"error",
                        code:400,
                        message:"El usuario ya existe!!",
                        usuario:usuario
                    });
                }else{
                    usuario = {
                        nombre:params.nombre
                    };
                    Usuario.create(usuario).then((usuarioA)=>{
                        return res.status(200).send({
                            status:"success",
                            code:200,
                            message:"El usuario fue almacenado con exito!!",
                            usuario:usuarioA
                        });
                    });
                }
            });
        }else{
            return res.status(400).send({
                status:"error",
                code:400,
                message:"No se han recibido todos los valores"
            });
        }
    },
    peliculaVista:function(req,res){
        var params=req.body;
        try{
            var validate_pelicula = !validator.isEmpty(params.id_pelicula_fk);
            var validate_usuario = !validator.isEmpty(params.id_usuario_fk);
        }catch(ex){
            return res.status(400).send({
                status:"error",
                code:400,
                message:"No se han recibido todos los valores"
            });
        }
        if(validate_pelicula && validate_usuario){  
            pelicula_usuario.findOne({
                where:{
                    id_pelicula_fk:params.id_pelicula_fk,
                    id_usuario_fk:params.id_usuario_fk
                }
            })
            .then((registro)=>{
                if(registro && registro.id_pelicula_fk==params.id_pelicula_fk && registro.id_usuario_fk==params.id_usuario_fk){
                    pelicula_usuario.update({
                        vista:1
                    },{
                        where:{
                            id_pelicula_fk:params.id_pelicula_fk,
                            id_usuario_fk:params.id_usuario_fk
                        }
                    })
                    .then((registro)=>{
                        return res.status(400).send({
                            status:"success",
                            code:200,
                            message:"Se ha actualizado el estado de la pelicula correctamente",
                            registro:registro
                        });
                    });
                }else{
                    registro={
                        id_pelicula_fk:params.id_pelicula_fk,
                        id_usuario_fk:params.id_usuario_fk,
                        calificacion:null,
                        vista:1
                    };
                    pelicula_usuario.create(registro)
                    .then((registro)=>{
                        return res.status(400).send({
                            status:"success",
                            code:200,
                            message:"Registro creado exitosamente",
                            registro:registro
                        });
                    });
                }
            });
        }else{
            return res.status(400).send({
                status:"error",
                code:400,
                message:"Error en la validacion"
            });
        }
    },
    calificarPelicula:function(req,res){
        var params=req.body;
        try{
            var validate_usuario = !validator.isEmpty(params.id_usuario_fk);
            var validate_pelicula = !validator.isEmpty(params.id_pelicula_fk);
            var validate_calificacion = !validator.isEmpty(params.calificacion) && validator.isNumeric(params.calificacion);
        }catch(ex){
            return res.status(400).send({
                status:"error",
                code:400,
                message:"No se recibieron los valores solicitados"
            });
        }
        if(validate_pelicula && validate_usuario && validate_calificacion){  
            pelicula_usuario.findOne({
                where:{
                    id_pelicula_fk:params.id_pelicula_fk,
                    id_usuario_fk:params.id_usuario_fk
                }
            })
            .then((registro)=>{
                if(registro && registro.id_pelicula_fk==params.id_pelicula_fk && registro.id_usuario_fk==params.id_usuario_fk){
                    pelicula_usuario.update({
                        calificacion:params.calificacion,
                        vista:1
                    },{
                        where:{
                            id_pelicula_fk:params.id_pelicula_fk,
                            id_usuario_fk:params.id_usuario_fk
                        }
                    })
                    .then((registro)=>{
                        return res.status(400).send({
                            status:"success",
                            code:200,
                            message:"Se ha actualizado la calificacion de la pelicula correctamente",
                            registro:registro
                        });
                    });
                }else{
                    registro={
                        id_pelicula_fk:params.id_pelicula_fk,
                        id_usuario_fk:params.id_usuario_fk,
                        calificacion:params.calificacion,
                        vista:1
                    };
                    pelicula_usuario.create(registro)
                    .then((registro)=>{
                        return res.status(400).send({
                            status:"success",
                            code:200,
                            message:"Registro creado exitosamente",
                            registro:registro
                        });
                    });
                }
            });
        }else{
            return res.status(400).send({
                status:"error",
                code:400,
                message:"Error en la validacion"
            });
        }
    },
    peliculasVistas:function(req,res){
        var id = req.params.id;
        pelicula_usuario.findAll({
            where:{
                id_usuario_fk:id,
                vista:1
            }
        })
        .then((lista)=>{
            return res.status(400).send({
                status:"success",
                code:200,
                message:"Lista de peliculas vistas obtenida con exito",
                lista:lista
            });
        });
    }
}

module.exports = usuarioController;