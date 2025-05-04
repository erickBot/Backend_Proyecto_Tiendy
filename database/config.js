const mongoose = require('mongoose');
const mongoDB = require('../config/mongo_url');

console.log(mongoDB.url);

const dbConnection = async() => {

    try{

        await mongoose.connect(mongoDB.url, {
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