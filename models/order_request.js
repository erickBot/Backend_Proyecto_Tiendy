const { Schema, model } = require('mongoose');

const OrderRequestSchema = Schema({

    id_category:{
        type: Schema.Types.ObjectId,
        ref:'categories'
    },
    id_store:{
        type: Schema.Types.ObjectId,
        ref:'stores'
    },
    id_client:{ 
        type: Schema.Types.ObjectId,
        ref:'users'
    },
    lat:{
        type: Number
    },
    lng:{
        type: Number
    },
    status:{
        type: String
    },
    timestamp:{
        type: Number
    },
    products:{
        type: Array,
        default: []
    },
    client:{
        type: Object,
        ref:'users'
    },
    address:{
        type: Object,
        ref: 'address'
    },
    ammount:{
        type: Number
    },
    ammount_delivery:{
        type: Number
    },
    is_pay:{
        type: Boolean,
        default: false
    },
    is_delivery:{
        type: Boolean,
        default: false
    },
    comment:{
        type: String
    },
    method_pay:{
        type: String
    },
    store:{
        type: Object,
        ref: 'stores'
    },
    is_calification:{
        type: Boolean,
    },
    distance:{
        type: Number
    },
    time:{
        type: Number
    },
    created_at:{
        type: String
    },
    items:{
        type: Array,
        default: []
    },
});

module.exports = model('Order_Requests', OrderRequestSchema);