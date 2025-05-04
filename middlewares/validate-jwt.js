const express = require('express');
const jwt = require('jsonwebtoken');

const Keys = require('../config/keys');
const User = require('../models/user');

const validateJWT = async (req, res, next)=>{

    const token = req.header('x-token');

    try{

        if(!token){
            return res.status(401).json({
                msg: 'No hay token en la peticion'
            });
        }
        const { uid } = jwt.verify(token, Keys.secretOrKey );

        const user = await User.findById( uid );
        //validar user
        if(!user){
            return res.status(401).json({
                msg: 'Usuario no registrado'
            });
        }
        //verificar si el uid tienen estado true
        if(!user.status){
            return res.status(401).json({
                msg: 'Usuario con estado false'
            });
        }
        //enviar el usuario en la request
        req.user = user;

        next();

    }catch(err){
        return res.status(401).json({
            msg: 'Token no valido',
            error: err
        });
    }

}

module.exports = {
    validateJWT
}