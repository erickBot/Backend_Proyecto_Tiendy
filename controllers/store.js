const express = require('express');
const Store = require('../models/store');
const User = require('../models/user');
const { getDistance } = require('../helpers/get_distance');

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

    async getByAddress(req, res){
    
        try{
            const fromLat = req.params.lat;
            const fromLng = req.params.lng;
            const storesByDistance = [];
       
            const stores = await Store.find();
       
            //filtra por distancia
           for (let store of stores){
            let toLat = store.lat;
            let toLng = store.lng;
             const  { distance, minutes } =  getDistance({fromLat, fromLng, toLat, toLng});
            //filtra por distancia
            if (distance <= 1000){
                store.distance = distance;
                store.minute = minutes;
                storesByDistance.push(store);
            }
           }
    
            res.status(200).json({
                data: storesByDistance,
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

            //console.log('STORE:', store);
            //almacenar en Mongo DB
            await store.save();
            //actualizar datos del usuario que creo la tienda
            const roles = {
                rol:  ['USER_ROLE', 'ADMIN_ROLE'],
            }
            //actualiza roles del usuario
            const myUser =  await User.findByIdAndUpdate( store.id_user, roles, {new: true});

            //construye la data que se va devolver al usuario
             const response = {
                "id": myUser.id,
                "name": myUser.name,
                "email": myUser.email,
                "google": myUser.google,
                "status":myUser.status,
                "rol": myUser.rol,
                "img":myUser.img,
                "phone":myUser.phone,
                "token": myUser.token,
                "rating":myUser.rating,
                "quantity": myUser.quantity
            }

            res.status(201).json({
                msg: 'Negocio creado correctamente, ahora inicie sesion',
                success: true,
                data: response
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