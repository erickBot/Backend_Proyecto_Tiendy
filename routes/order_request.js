const { Router } = require('express');
const OrderRequest = require('../controllers/order_request');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();

router.post('/create', [ validateJWT ], OrderRequest.create);
router.put('/update',  [ validateJWT ], OrderRequest.update);
router.get('/getAll',  [ validateJWT ], OrderRequest.getAll);
router.get('/getByIdUser/:id_user', [ validateJWT ], OrderRequest.getByIdUser);
router.delete('/delete/:id', [ validateJWT ], OrderRequest.delete);
  
module.exports = router;