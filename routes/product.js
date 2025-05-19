const { Router } = require('express');
const Product = require('../controllers/product');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();

router.post('/create', [ validateJWT ], Product.create);
router.put('/update/:id', [ validateJWT ], Product.update);
router.get('/getAll', [ validateJWT ], Product.getAll);
router.get('/getByIdCategory/:id_category', [ validateJWT ], Product.getByIdCategory);
router.delete('/delete/:id', [ validateJWT ], Product.delete);
  
module.exports = router;