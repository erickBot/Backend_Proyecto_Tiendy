const express = require('express');
const Rol = require ('../models/rol');

module.exports = {


    async getAll(req, res){
    
        try{
            const roles = await Rol.find();
    
            res.status(200).json({
                success: true,
                data: roles
            });
    
        }catch(err){
            console.log(err);
            return res.status(400).json({
                msg:'Ocurrio un error al obtener los roles',
                success: false
            });
        }
    
    },

    async getByIdUser(req, res){
    
        try{
            const idUser = req.params.id_user;

            console.log('ID_USER:', idUser);
            const rol= await Rol.find({'id_user':idUser});
    
            res.status(200).json({
                data: rol,
                success: true
            });
    
        }catch(err){
            console.log(err);
            return res.status(400).json({
                msg:'Ocurrio un error al obtener los roles',
                success: false
            });
        }
    
    },

    async create (req, res){
        try{

            const body = req.body;

            //preparar la data a guardar
            const rol = new Rol( body );
            //almacenar en Mongo DB
           await rol.save();

            res.status(201).json({
                msg: 'Rol creado con exito',
                data: rol,
                success: true
            });

        }catch(err){
            console.log(err);
            return res.status(400).json({
                msg:'Ocurrio un error al crear el rol',
                error: err,
                success: false
            });
        }
    }
}