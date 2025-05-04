const { Schema, model } = require('mongoose');

const ProductSchema = Schema({

    name:{
        type: String,
        required:[true, 'El nombre es obligatorio'],
        unique: true

    },
    description:{
        type: String
    },
    img:{
        type: String
    },
    price:{
        type: Number,
        default:0
    },
   id_category:{
        type: Schema.Types.ObjectId,
        ref:'Categories',
        required: true
    },
    available:{
        type: Boolean,
        default: true
    }

});

module.exports = model('Products', ProductSchema);