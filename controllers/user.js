const { response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

module.exports = {

    async getAll (req, res ){

        try{
           const users = await User.find();

            res.status(200).json({
                data: users,
                success: true
            });

        }catch(err){
            console.log(err);
            return res.status(404).json({
                msg: 'Ocurrio un error al obtener todos los usuarios',
                success: false
            });
        }
    },

    async  create (req, res ){

        try{
            const { name, email, phone, password} = req.body;
            const  user = new User({name, email, phone, password});
            //encriptar password
            const salt = bcryptjs.genSaltSync();
            user.password = bcryptjs.hashSync(password, salt);
            user.rol = ['USER_ROLE'];
            //almacena en Mongo DB
            await user.save();
    
            res.status(201).json({
                msg: 'El registro se realizo con exito, ahora inicie sesion',
                success: true
            });

        }catch(err){
            console.log(err);
            return res.status(400).json({
                msg: 'Ocurrio un error al registrar usuario!',
                error: err,
                success: false
            });
        }
    },

    async  update  (req, res ){

        try{

            const { id, name, phone, img, rol, notification_token } = req.body;
           // const body  = req.body;

            const data = {
                name, phone, img, rol, notification_token
            };

            //console.log(data);

            await User.findByIdAndUpdate( id, data, {new: true});

            res.status(201).json({
                msg: 'Usuario actualizado correctamente',
                success: true
            });

        }catch(err){
            console.log(err);
            return res.status(400).json({
                msg: 'Ocurrio un error al actualizar usuario',
                success: false
            });
        }

    },

    async delete (req, res){
        try{
            const id  = req.params.id;

            const user = await User.findByIdAndUpdate(id, {  status: false });
   
            res.status(201).json({
                msg: 'Usuario eliminado correctamente',
                user
            });

        }catch(err){
            console.log(err);
            return res.status(400).json({
                msg: 'Ocurrio un error al eliminar usuario'
            });
        }
    },
}



