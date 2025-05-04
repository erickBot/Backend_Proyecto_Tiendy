const mongoose = require('mongoose');
const mongoDB = require('../config/mongo_url');

const dbConnection = async() => {

    try{

        await mongoose.connect('mongodb+srv://pacasystems:uH8tif5KX5ciw6BG@clustertesttiendy.8q7p5c8.mongodb.net/tiendyDB', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log('Base de datos online');
        

    }catch(error){
        console.log(error);
        throw new Error('Error al iniciar la base de datos');
    }

}

module.exports = {
    dbConnection
}