const { response } = require('express');


    const userGet = (req, res = response)=> {
        
        const query = req.query;

        res.json({
            msg: 'get API - Controlador',
            query: query
        });
    }

    const userPost = (req, res = response)=>{

        const { nombre , correo , password } = req.body;

        res.status(201).json({
            msg: 'post API - Controlador',
            nombre: nombre,
            correo: correo
        });
    }

    const userDelete = (req, res = response)=>{
        res.json({
            msg: 'delete API - Controlador'
        });
    }

    const userPut = (req, res = response)=>{

        const id  = req.params.id;

        res.json({
            msg: 'put API - Controlador',
            id: id
        });
    }

module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete
}