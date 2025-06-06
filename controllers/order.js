const express = require('express');
const Order = require ('../models/order');
const Store = require('../models/store');
const Client = require('../models/user');

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
            const orders= await Order.find({'id_client':idUser}).sort({timestamp: -1});
    
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

    async getByIdStore(req, res){
    
        try{
            const idStore = req.params.id_store;
            const orders= await Order.find({'id_store':idStore}).sort({timestamp: -1});
    
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
            body.created_at = new Date();

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
            //actualiza la order
            await Order.findByIdAndUpdate( _id, body, {new: true} );
            //actualizar store con numero de ventas y cliente con numero de compras
            if (body.status == 'Entregado'){
                //numero de ventas del local
                const list = await Order.find({'id_store':body.id_store});
                const data = {
                    quantity: list.length,
                }
                await Store.findByIdAndUpdate(body.id_store, data, {new: true});
                //numero de compras del cliente
                const orderList =  await Order.find({'id_client':body.id_client});

                  const dataClient = {
                    quantity: orderList.length,
                }

                await Client.findByIdAndUpdate(body.id_client, dataClient, {new: true});
            }
    
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