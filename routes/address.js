const { Router } = require('express');
const Address = require('../controllers/address');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();

router.post('/create', [ validateJWT ], Address.create);
router.get('/getByIdUser/:id_user', [ validateJWT ], Address.getByIdUser);
router.delete('/delete/:id', [ validateJWT ], Address.delete);
  
module.exports = router;