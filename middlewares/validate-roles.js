const express = require('express');

const adminRol = (req, res, next)=>{

    if(!req.user){
        return res.status(500).json({
            msg: 'Se quiere validar el rol sin antes validar el token'
        });
    }

   const { rol, name } = req.user;

   if (rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: 'Este usuario no es administrador'

        });
   }

    next();
}

module.exports = {
    adminRol
}