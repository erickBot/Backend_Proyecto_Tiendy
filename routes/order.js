const { Router } = require('express');
const Order = require('../controllers/order');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();

router.post('/create', [ validateJWT ], Order.create);
router.put('/update',  [ validateJWT ], Order.update);
router.get('/getAll',  [ validateJWT ], Order.getAll);
router.get('/getByIdUser/:id_user', [ validateJWT ], Order.getByIdUser);
router.get('/getByIdStore/:id_store', [ validateJWT ], Order.getByIdStore);
router.delete('/delete/:id', [ validateJWT ], Order.delete);
  
module.exports = router;