const express = require('express');
const Store = require ('../models/store');

module.exports = {

    async getAll(req, res){
    
        try{
            const stores = await Store.find();
    
            res.status(200).json({
                data: stores,
                success: true
            });
    
        }catch(err){
            console.log(err);
            return res.status(400).json({
                msg:'Ocurrio un error al obtener todas las tiendas',
                success: false
            });
        }
    
    },

    async getByIdUser(req, res){
    
        try{
            const idUser = req.params.id_user;
            const stores= await Store.findOne({'id_user':idUser});
    
            res.status(200).json({
                data: stores,
                success: true
            });
    
        }catch(err){
            console.log(err);
            return res.status(400).json({
                msg:'Ocurrio un error al obtener las tiendas',
                success: false
            });
        }
    
    },

    async create (req, res){
        try{

            const { name_store, ... body} = req.body;
            //validar si existe 
            const myStore = await Store.findOne({'name_store':name_store});
            
                if (myStore){
                    return res.status(400).json({
                        msg: `La tienda ${ myStore.name }, ya existe`,
                        success: false
                    })
                }

            //preparar la data a guardar
            const data = {
                     ...body, name_store, rating: 0, promotion: 0, available: true, open: false
            }
            const store = new Store( data );
            //almacenar en Mongo DB
            await store.save();

            res.status(201).json({
                msg: 'Negocio creado correctamente, ahora inicie sesion',
                success: true
            });

        }catch(err){
            console.log(err);
            return res.status(400).json({
                msg:'Ocurrio un error al crear su tienda',
                error: err,
                success: false
            });
        }
    },

     async update (req, res){
        try{
    
            const {_id, ...body} = req.body;
            
            const store = await Store.findByIdAndUpdate( _id, body, {new: true} );
    
            res.status(201).json({
                msg: 'Tu Negocio fue actualizado correctamente',
                success: true,
                data: store
            });
    
        }catch(err){
            console.log(err);
            return res.status(400).json({
                msg:'Ocurrio un error al actualizar tu negocio',
                success: false
            });
        }
    },

     async delete (req, res){
            try{
                const id  = req.params.id;
        
                await Store.findByIdAndDelete(id);
        
                res.status(201).json({
                    msg: 'La tienda eliminado correctamente',
                    success: true
                });
        
            }catch(err){
                console.log(err);
                return res.status(400).json({
                     msg: 'Ocurrio un error al eliminar tienda',
                     success: false
                });
            }
        },
}