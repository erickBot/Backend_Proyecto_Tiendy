const { Router } = require('express');
const Category = require('../controllers/category');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();

router.post('/create', [ validateJWT ], Category.create);
router.put('/update/:id', [ validateJWT ], Category.update);
router.get('/getAll', [ validateJWT ], Category.getAll);
router.delete('/delete/:id', [ validateJWT ], Category.delete);

  
module.exports = router;