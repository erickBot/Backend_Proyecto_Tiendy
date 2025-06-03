const { Schema, model } = require('mongoose');

const CalificationClientSchema = Schema({

    id_client:{
        type: Schema.Types.ObjectId,
        ref:'users',
        required: true
    },
    id_order:{
        type: Schema.Types.ObjectId,
        ref:'orders',
        required: true
    },
    rating:{
        type: Number,
        default: 0
    },
    store:{
        type: Object,
        ref: 'stores'
    },
    timestamp:{
        type: Number
    },
},
{
    timestamps: true
});

module.exports = model('Califications_client', CalificationClientSchema);