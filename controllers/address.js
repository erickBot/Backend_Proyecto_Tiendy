const express = require('express');
const Address = require ('../models/address');

module.exports = {

    async getByIdUser(req, res){
    
        try{
            const idUser = req.params.id_user;

           // console.log('ID_USER:', idUser);
            const address= await Address.find({'id_user':idUser});
    
            res.status(200).json({
                data: address,
                success: true
            });
    
        }catch(err){
            console.log(err);
            return res.status(400).json({
                msg:'Ocurrio un error al obtener las direcciones',
                success: false
            });
        }
    
    },

    async create (req, res){
        try{

            const body = req.body;
            console.log(body);
       
            const newAddress = new Address( body );
            //almacenar en Mongo DB
           await newAddress.save();

            res.status(201).json({
                msg: 'Direccion creada con exito',
                success: true
            });

        }catch(err){
            //console.log(err);
            return res.status(400).json({
                msg:'Ocurrio un error al crear la direccion',
                error: err,
                success: false
            });
        }
    },
     async delete (req, res){
            try{
                const id  = req.params.id;
        
                await Address.findByIdAndDelete(id);
        
                res.status(201).json({
                    msg: 'La direccion fue eliminada correctamente',
                    success: true
                });
        
            }catch(err){
                console.log(err);
                return res.status(400).json({
                     msg: 'Ocurrio un error al eliminar la direccion',
                     success: false
                });
            }
        },
}