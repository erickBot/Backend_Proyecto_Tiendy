const express = require('express');
const OrderRequest = require ('../models/order_request');
const OrderSocket = require('../helpers/order_socket');

module.exports = {

    async getAll(req, res){
    
        try{
            const orders = await OrderRequest.find();

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
            const orders= await OrderRequest.findOne({'_id':idUser});
    
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
    async getByStatus(req, res){
    
        try{
            const status = req.params.status;

            console.log('STATUS:', status);
            //ordena por timestamp
            const orders = await OrderRequest.find({ 'status':status }).sort({ timestamp: -1});
    
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

            const { _id, ... body} = req.body;
            body.created_at = new Date();
            //validar si existe la orden
            const myOrder = await OrderRequest.findOne({ _id });

            if (myOrder){
                 console.log('existe');
                await OrderRequest.findByIdAndUpdate( _id, body, {new: true} );
            }else{
                //console.log('no existe',_id,  body);
                body._id = _id;
                const order = new OrderRequest( body );
                //console.log(order);
                //almacenar en Mongo DB
                await order.save();
            }
            //llama al scoket
            //OrderSocket.call();
            

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
           
            await OrderRequest.findByIdAndUpdate( _id, body, {new: true} );
    
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
        
                await OrderRequest.findByIdAndDelete(id);
        
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