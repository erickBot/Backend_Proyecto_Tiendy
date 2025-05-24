const express = require('express');
const OrderInfo = require ('../models/order_info');
const order = require('./order');

module.exports = {

    async getAll(req, res){
    
        try{
            const orders = await OrderInfo.find();

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

            console.log('ID USER', idUser);
            const orders= await OrderInfo.find({'id_client':idUser});

            console.log(orders);
    
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
            const myOrder = await OrderInfo.findOne({ _id });

            if (myOrder){
                console.log('existe');
                await OrderInfo.findByIdAndUpdate( _id, body, {new: true} );
            }else{
                //console.log('no existe',_id,  body);
                body._id = _id;
                const order = new OrderInfo( body );
                //console.log(order);
                //almacenar en Mongo DB
                await order.save();
            }

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
           
            await OrderInfo.findByIdAndUpdate( _id, body, {new: true} );
    
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
        
                await OrderInfo.findByIdAndDelete(id);
        
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