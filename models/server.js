const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';
        this.categoryPath = '/api/categories'
        this.productPath = '/api/products'
        //conectar a base de datos
        this.connectDB();
        //Middlewares
        this.middlewares();
        //rutas
        this.routes();
    }

    async connectDB(){
        await dbConnection();
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
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.categoryPath, require('../routes/category'));
        this.app.use(this.productPath, require('../routes/product'));
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Servidor corriendo en el puerto', this.port);
        });
    }

}

module.exports = Server;