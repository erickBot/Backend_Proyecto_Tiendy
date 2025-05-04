const { Schema, model } = require('mongoose');

const CategorySchema = Schema({

    name:{
        type: String,
        required:[true, 'El nombre es obligatorio'],
        unique: true
    },
    description:{
        type: String
    },
    img:{
        type: String,
    },
    status:{
        type: Boolean,
        default: true,
        required: true
    },

});

module.exports = model('Categories', CategorySchema);