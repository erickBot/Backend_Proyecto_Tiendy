const jwt = require('jsonwebtoken');
const Keys = require('../config/keys');

const generarJWT = (uid) =>{

    return new Promise((resolve, reject)=>{

        const payload = { uid };

        jwt.sign(payload,Keys.secretOrKey, {
            expiresIn: '4h'
        },(err, token) =>{
            if(err){
                console.log(err);
                reject('No se pudo generar el JWT');
            }else{
                resolve(token);
            }
        })

    });

}

module.exports = {
    generarJWT
}