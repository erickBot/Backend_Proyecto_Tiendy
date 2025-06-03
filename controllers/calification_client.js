const express = require('express');
const CalificationClient = require ('../models/calification_client');
const Order = require('../models/order');
const Client = require('../models/user');

module.exports = {

   
    async getByIdClient(req, res){
    
        try{
            const idClient = req.params.id_client;
            const califications = await CalificationClient.find({'id_client':idClient});
    
            res.status(200).json({
                data: califications,
                success: true
            });
    
        }catch(err){
            console.log(err);
            return res.status(400).json({
                msg:'Ocurrio un error al obtener las calificaciones',
                success: false
            });
        }
    
    },

    async create (req, res){
        try{

            const body = req.body; 
           
            const calification = new CalificationClient( body );

            console.log(calification);
            //almacenar en Mongo DB
            await calification.save();
            //actualizar la order
            const idOrder = calification.id_order;
            const dataOrder = { 
                is_client_calificated: true,
            };

            console.log(dataOrder);
            await Order.findByIdAndUpdate( idOrder, dataOrder, {new: true} );

            //actualizar rating de store
            const idClient = calification.id_client;
            const califications = await CalificationClient.find({'id_client':idClient});
            let total = 0;

            if (califications){

                for (let item of califications){
                    total = total + item.rating;
            
                }
                total = total /(califications.length);

            }

            const dataClient = {
                rating: total,
            }


            await Client.findByIdAndUpdate( idClient, dataClient, {new: true} );

            res.status(201).json({
                msg: 'Calificacion creada con exito',
                success: true
            });

        }catch(err){
            console.log(err);
            return res.status(400).json({
                msg:'Ocurrio un error al crear calificacion',
                error: err,
                success: false
            });
        }
    },

}