const express = require('express');
const cors = require('cors');
const server = require('http');
const io = require('socket.io');
const orderSocket = require('../helpers/order_socket');

const { dbConnection } = require('../database/config');

class Server{

    constructor(){
        this.app = express();//coneccion de socket
        this.port = process.env.PORT || 3000;
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';
        this.categoryPath = '/api/categories'
        this.productPath = '/api/products'
        this.storePath = '/api/stores'
        this.addressPath = '/api/address'
        this.rolPath = '/api/roles'
        this.orderPath = '/api/orders'
        //para los clientes
        this.orderRequestPath = '/api/orders/request'
        this.calificationStorePath = '/api/calification/store'
        this.calificationClientPath = '/api/calification/client'
        //conectar a base de datos
        this.connectDB();
        //Middlewares
        this.middlewares();
        //rutas
        this.routes();
        //socket io
        //this.socket();
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
        this.app.use(this.storePath, require('../routes/store'));
        this.app.use(this.addressPath, require('../routes/address'));
        this.app.use(this.rolPath, require('../routes/rol'));
        this.app.use(this.orderPath, require('../routes/order'));
        this.app.use(this.orderRequestPath, require('../routes/order_request'));
        this.app.use(this.calificationStorePath, require('../routes/calification_store'));
        this.app.use(this.calificationClientPath, require('../routes/calification_client'));

    }

    listen(){
        const server_io = server.createServer(this.app);
        const IO = io(server_io, {cors:{origin: '*'}})
        //llama a los socket
        orderSocket(IO);

        server_io.listen(this.port, ()=>{
            console.log('Servidor corriendo en el puerto:', this.port);
        });
    }

}

module.exports = Server;