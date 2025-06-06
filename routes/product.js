const { Router } = require('express');
const Product = require('../controllers/product');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();

router.post('/create', [ validateJWT ], Product.create);
router.put('/update/:id', [ validateJWT ], Product.update);
router.get('/getAll', [ validateJWT ], Product.getAll);
router.get('/getByIdCategory/:id_category', [ validateJWT ], Product.getByIdCategory);
router.get('/findByName/:id_category/:name',[ validateJWT ], Product.findByName);
router.delete('/delete/:id', [ validateJWT ], Product.delete);
  
module.exports = router;