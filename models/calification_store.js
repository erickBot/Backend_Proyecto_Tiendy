const { Schema, model } = require('mongoose');

const CalificationStoreSchema = Schema({

    id_store:{
        type: Schema.Types.ObjectId,
        ref:'stores',
        required: true
    },
    id_order:{
        type: Schema.Types.ObjectId,
        ref:'orders',
        required: true
    },

    title:{
        type: String
    },
    rating:{
        type: Number,
        default: 0
    },
    client:{
        type: Object,
        ref: 'users'
    },
    calification:{
        type: Array
    },
    timestamp:{
        type: Number
    },
},
{
    timestamps: true
});

module.exports = model('Califications_store', CalificationStoreSchema);