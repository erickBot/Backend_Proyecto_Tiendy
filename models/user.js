const { Schema, model } = require('mongoose');

const UsersSchema = Schema({

    name:{
        type: String,
        required:[true, 'El nombre es oblogatorio'],

    },
    email:{
        type: String,
        required:[true, 'El correo es oblogatorio'],
        unique: true

    },
    password:{
        type: String,
        required:[true, 'El contrasena es oblogatorio']

    },
    img:{
        type: String,

    },
    phone:{
        type: String,

    },
    rol:{
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']

    },
    status:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    },
});

module.exports = model('Users', UsersSchema);