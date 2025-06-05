const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Jwt = require ('../helpers/generar_jwt');

const User = require('../models/user');
const { googleVerify } = require('../helpers/google-verify');

module.exports = {

    async  login (req, res ){

        try{
            const { email, password} = req.body;
            //busca si existe el correo
            const myUser = await User.findOne({email});
            
            if (!myUser){
                return res.status(401).json({
                    msg: 'Email no encontrado!',
                    success: false
                });
            }
            //validar el password
            const validatePassword = bcryptjs.compareSync(password, myUser.password);

            if (!validatePassword){
                return res.status(401).json({
                    msg: 'Password incorrecto!',
                    success: false
                });
            }

            //generar JWT
            const token = await Jwt.generarJWT(myUser.id);

            if (!token){
                return res.status(401).json({
                    msg: 'Ocurrio un error al generar token',
                    success: false
                });
            }
            //construye la data que se debe devolver al usuario
            const body = {
                "id": myUser.id,
                "name": myUser.name,
                "email": myUser.email,
                "google": myUser.google,
                "status":myUser.status,
                "rol": myUser.rol,
                "img":myUser.img,
                "phone":myUser.phone,
                "token": token,
                "rating":myUser.rating,
                "quantity": myUser.quantity
            }
           
            res.status(201).json({
                msg: 'Usuario autenticado',
                success: true,
                data: body
            });
            
        }catch(err){
            console.log(err);
            return res.status(401).json({
                msg: 'Ocurrio un error al iniciar sesion',
                success: false,
                error: err
            });
        }

    },

    async logout (req, res){
        try{
             const id  = req.params.id;
    
            const user = await User.findByIdAndUpdate(id, {  status: false });
       
            res.status(201).json({
                 msg: 'Logout exitoso',
                 success: true
            });
    
        }catch(err){
            console.log(err);
            return res.status(400).json({
                msg: 'Ocurrio un error',
                success: false
            });
        }
    },

    //Sign In Id_token
    async googleSignIn (req, res){
        try{
            const { id_token }  = req.body;

   
            const base64Url = id_token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const buff = Buffer.from(base64, 'base64');
            const payload = JSON.parse(buff.toString('utf-8'));
     

            console.log('Token aud:', payload.aud);

            //const { name, email, picture} = await googleVerify(id_token);


            console.log('USER', name, email, picture);

            let user = await User.findOne({ email });

  
            if (!user){
                //crearlo
                const salt = bcryptjs.genSaltSync();
                const password = bcryptjs.hashSync('123456', salt);
                const data = {
                    name, email, img: picture, password, google: true, rol: ['USER_ROLE']
                };

                user = new User( data );
                await user.save();


            }
            //si el usuario de google en DB es false
            if (!user.status){
                return res.status(401).json({
                    msg:'Usuario bloqueado',
                    success: false
                });
            }

            //generar JWT
            const token = await Jwt.generarJWT(user.id);

            //construye la data que se debe devolver al usuario
            const body = {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "google": user.google,
                "status":user.status,
                "rol": user.rol,
                "img": user.img,
                "phone":user.phone,
                "token": token,
                "rating":user.rating,
                "quantity": user.quantity
            }             
            
            res.status(201).json({
                msg: 'Usuario autenticado con google',
                success: true,
                data: body
            });

        }catch(err){
            console.log(err);
            return res.status(400).json({
                msg: 'Token de google no valido',
                success: false,
                error: err
            });
        }
    },
}



