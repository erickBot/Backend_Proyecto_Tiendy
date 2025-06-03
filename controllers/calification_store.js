const express = require('express');
const CalificationStore = require ('../models/calification_store');
const Order = require('../models/order');
const Store = require('../models/store');

module.exports = {

   
    async getByIdStore(req, res){
    
        try{
            const idStore = req.params.id_store;
            const califications = await CalificationStore.find({'id_store':idStore});
    
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
            //validar si existe 
           
            const calification = new CalificationStore( body );
            //almacenar en Mongo DB
            await calification.save();
            //actualizar la order
            const idOrder = calification.id_order;
            const dataOrder = { 
                is_store_calificated: true,
            };
            await Order.findByIdAndUpdate( idOrder, dataOrder, {new: true} );

            //actualizar rating de store
            const idStore = calification.id_store;
            const califications = await CalificationStore.find({'id_store':idStore});
            let total = 0;

            for (let item of califications){
                total = total + item.rating;
           
            }
            total = total /(califications.length);
            
            const dataStore = {
                rating: total,
            }

            await Store.findByIdAndUpdate( idStore, dataStore, {new: true} );

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