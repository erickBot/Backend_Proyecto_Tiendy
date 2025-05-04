const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Jwt = require ('../helpers/generar_jwt');

const User = require('../models/user');

module.exports = {

    async  login (req, res ){

        try{
            const { email, password} = req.body;
            //busca si existe el correo
            const myUser = await User.findOne({email});
            
            if (!myUser){
                return res.status(401).json({
                    msg: 'Email no encontrado!'
                });
            }
            //validar el password
            const validatePassword = bcryptjs.compareSync(password, myUser.password);

            if (!validatePassword){
                return res.status(401).json({
                    msg: 'Password incorrecto!'
                });
            }

            //generar JWT
            const token = await Jwt.generarJWT(myUser.id);

            if (!token){
                return res.status(401).json({
                    msg: 'Ocurrio un error al generar token'
                });
            }
            //construye la data que se debe devolver al usuario
            const body = {
                "id": myUser.id,
                "name": myUser.name,
                "email": myUser.email,
                "status":myUser.status,
                "rol": myUser.rol,
                "token": token
            }
           
            res.status(201).json({
                msg: 'Usuario autenticado',
                data: body
            });
            
        }catch(err){
            console.log(err);
            return res.status(401).json({
                msg: 'Ocurrio un error al iniciar sesion',
                error: err
            });
        }

    }
}



