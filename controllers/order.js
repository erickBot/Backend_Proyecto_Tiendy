const express = require('express');
const Order = require ('../models/order');

module.exports = {

    async getAll(req, res){
    
        try{
            const orders = await Order.find();

            console.log(orders);
    
            res.status(200).json({
                data: orders,
                success: true
            });
    
        }catch(err){
            console.log(err);
            return res.status(400).json({
                msg:'Ocurrio un error al obtener todas las ordenes',
                success: false
            });
        }
    
    },

    async getByIdUser(req, res){
    
        try{
            const idUser = req.params.id_user;
            const orders= await Order.findOne({'id_client':idUser});
    
            res.status(200).json({
                data: orders,
                success: true
            });
    
        }catch(err){
            console.log(err);
            return res.status(400).json({
                msg:'Ocurrio un error al obtener las ordenes',
                success: false
            });
        }
    
    },

    async create (req, res){
        try{

            const body = req.body;

            console.log(body);
      
            const order = new Order( body );
            //almacenar en Mongo DB
            await order.save();

            res.status(201).json({
                msg: 'Orden enviada con exito',
                success: true
            });

        }catch(err){
            console.log(err);
            return res.status(400).json({
                msg:'Ocurrio un error al crear su orden',
                error: err,
                success: false
            });
        }
    },

     async update (req, res){
        try{
    
            const {_id, ...body} = req.body;
           
            await Order.findByIdAndUpdate( _id, body, {new: true} );
    
            res.status(201).json({
                msg: 'Tu orden fue actualizada correctamente',
                success: true
            });
    
        }catch(err){
            console.log(err);
            return res.status(400).json({
                msg:'Ocurrio un error al actualizar la orden',
                success: false
            });
        }
    },

     async delete (req, res){
            try{
                const id  = req.params.id;
        
                await Order.findByIdAndDelete(id);
        
                res.status(201).json({
                    msg: 'La orden se elimino correctamente',
                    success: true
                });
        
            }catch(err){
                console.log(err);
                return res.status(400).json({
                     msg: 'Ocurrio un error al eliminar la orden',
                     success: false
                });
            }
        },
}