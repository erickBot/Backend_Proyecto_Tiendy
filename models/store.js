const { Schema, model } = require('mongoose');

const StoreSchema = Schema({

    name_store:{
        type: String,
        required:[true, 'El nombre del negocio es obligatorio'],
        unique: true
    },
    id_user:{
        type: String,
        required:[true, 'El id de usuario es obligatorio'],
        unique: true
    },
    description:{ 
        type: String
    },
    type:{
        type: String,
        required:[true, 'El tipo de negocio es obligatorio'],
    },
    logo_url:{
        type: String
    },
    background_url:{
        type: String
    },
    available:{
        type: Boolean,
        default: true
    },
    open:{
        type: Boolean,
        default: true
    },
    promotion:{
        type: Number,
        default: 0
    },
    rating:{
        type: Number,
        default: 0
    },
    open_at:{
        type: String
    },
    close_at:{
        type: String
    },
    name:{
        type: String,
        required:[true, 'El nombre del representante es obligatorio']
    },
    lastname:{
        type: String,
        required:[true, 'El apellido es obligatorio']
    },
    phone:{
        type: String,
        required:[true, 'El celular es obligatorio'],
        unique: true
    },
    address:{
        type: String
    },
    locality:{
        type: String,
    },
    lat:{
        type: Number,
    },
    lng:{
        type: Number,
    },
    country:{
        type: String,
    },
    quantity:{
        type: Number,
        default: 0
    },
    notification_token:{
        type: String,
    }
});

module.exports = model('Stores', StoreSchema);