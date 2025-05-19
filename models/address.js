const { Schema, model } = require('mongoose');

const AddressSchema = Schema({

    id_user:{
        type: Schema.Types.ObjectId,
        ref:'users',
        required: true
    },
    address:{
        type: String
    },
    piso:{
        type: String,
    },
    locality:{
        type: String,
    },
    sub_locality:{
        type: String,
    },
    codigo_postal:{
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

});

module.exports = model('Address', AddressSchema);