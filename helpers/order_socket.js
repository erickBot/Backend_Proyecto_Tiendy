const OrderRequest = require('../models/order_request');
const Order = require('../models/order');
console.log('socket iniciado!');
module.exports = (io) =>{

    const orderRequestNameSapace = io.of('/orders');

        orderRequestNameSapace.on('connection', (socket)=>{

            console.log('USUARIO CONECTADO AL NAMESPACE:/orders');
            //cuando recien se conecta el usuario, debe recibir las ordenes creadas
            //crea una order request
            socket.on('order/request', (data)=>{
                //console.log('CLIENTE EMITIO: ',data);
                createOrderRequest(data.order);
            });
            //actualiza una order request
            socket.on('order/request/update', (data)=>{
                //console.log('CLIENTE ENITIO: ',data);
                updateOrderRequest(data.order);
            });
            //escucha y emite una order info 
            socket.on('order/info', (data) => {
                //console.log(`Emitio: ${JSON.stringify(data.order._id)}`);
                orderRequestNameSapace.emit(`order/info/${data.order._id}`, data.order);
            });
            //crear una order aceptada
            socket.on('order/accepted', (data) => {
                console.log('ORDER ACCEPTED');
                createOrder(data.order);
            });
            //cliente desconectado
            socket.on('disconnect', (data)=>{
                console.log('USUARIO DESCONECTADO');
            });
            //obtiene una lista de order request
            const getOrdersRequest = async (status)=>{
                const orders = await OrderRequest.find({'status':status}).sort({timestamp: -1});
                //console.log('SERVER EMITIO:', orders);
                orderRequestNameSapace.emit('orders', orders);
            };
            //actualiza una order request
            const updateOrderRequest = async (order)=>{
                await OrderRequest.findByIdAndUpdate( order._id, order, {new: true} );
               // console.log('UPDATE ORDER');
                getOrdersRequest('Created');
                
            };
            //crea un order request
            const createOrderRequest = async (order)=>{
            
                order.created_at = new Date();
               // validar si existe la orden
               const myOrder = await OrderRequest.findOne({ '_id': order._id });
        
                if (myOrder){
                    console.log('existe');
                    await OrderRequest.findByIdAndUpdate( order._id, order, {new: true} );
                }else{
                    
                    const newOrder = new OrderRequest( order );
                    console.log(newOrder);
                    //almacenar en Mongo DB
                    await newOrder.save();
                 
                }   
                
                getOrdersRequest('Created');      
            }
            //crear order aceptada por el cliente
            const createOrder = async (order)=>{
                order.status = 'Aceptado';
                const newOrder = new Order( order );
                console.log(newOrder);
                //almacenar en Mongo DB
                await newOrder.save();
                //actualizar order request del cliente => aceptada
                order._id = order.id_client;
                order.status = 'Aceptado';
                updateOrderRequest(order);
         
            }

            getOrdersRequest('Created');

        });


}

// module.exports = (io) =>{
//     const orderDeliveryNameSpace = io.of('/orders/delivery');
//     orderDeliveryNameSpace.on('connection', function(socket) {

//         console.log('USUARIO CONECTADO AL NAMESPACE /orders/delivery');
//         socket.on('position', function(data){
//             console.log(`Emitio: ${JSON.stringify(data)}`);
//             orderDeliveryNameSpace.emit(`position/${data.id_order}`,{lat: data.lat, lng: data.lng});
            
//         });
//         socket.on('disconnect', function(data){
//             console.log('USUARIO DESCONECTADO');
//         });

//     });

// }