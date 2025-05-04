const mongoose = require('mongoose');
require('dotenv').config({ path: './.env' });

const dbConnection = async() => {

    try{

        await mongoose.connect(process.env.mongoURL, {
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