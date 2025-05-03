const express = require('express');
const cors = require('cors');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.usuariosPath = '/api/usuarios';
        //Middlewares
        this.middlewares();
        //rutas
        this.routes();
    }

    middlewares(){
        //cors
        this.app.use(cors());
        //Parser JSON
        this.app.use(express.json());
        //directorio publico
        this.app.use(express.static('public'));
      
    }

    routes(){
       
        this.app.use(this.usuariosPath, require('../routes/user'));
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Servidor corriendo en el puerto', this.port);
        });
    }

}

module.exports = Server;