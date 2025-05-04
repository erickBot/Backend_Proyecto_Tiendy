const mongoose = require('mongoose');

const dbConnection = async() => {

    try{

        const uri = process.env.MONGO_URI;
        //console.log('MONGO_URI', uri);

        if (!uri){
            throw new Error("MONGO_URI no está definido");
        }

        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        //console.log(process.env.mongoURL);
        console.log('Base de datos online');

    }catch(error){
        console.log(error);
        throw new Error('Error al iniciar la base de datos');
    }

}

module.exports = {
    dbConnection
}