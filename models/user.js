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
        required:[true, 'La contrasena es oblogatorio']

    },
    img:{
        type: String,

    },
    phone:{
        type: String,
        unique: true

    },
    rol:{
        type: Array,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE', 'DELIVERY_ROL']

    },
    status:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    },
    id_store:{
        type: Schema.Types.ObjectId,
        ref:'stores'
    },
});

module.exports = model('Users', UsersSchema);