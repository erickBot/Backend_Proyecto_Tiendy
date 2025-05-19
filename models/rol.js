const { Schema, model } = require('mongoose');

const RolSchema = Schema({
    rol:{
        type: String,
        required:[true, 'El rol es obligatorio'],
    },
    img:{
        type: String
    }

});

module.exports = model('Roles', RolSchema);