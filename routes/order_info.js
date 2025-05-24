const { Router } = require('express');
const OrderInfo = require('../controllers/order_info');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();

router.post('/create', [ validateJWT ], OrderInfo.create);
router.put('/update',  [ validateJWT ], OrderInfo.update);
router.get('/getAll',  [ validateJWT ], OrderInfo.getAll);
router.get('/getByIdUser/:id_user', [ validateJWT ], OrderInfo.getByIdUser);
router.delete('/delete/:id', [ validateJWT ], OrderInfo.delete);
  
module.exports = router;