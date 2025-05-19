const { Router } = require('express');
const Rol = require('../controllers/rol');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();

router.post('/create',  Rol.create);
router.get('/getByIdUser/:id_user', [ validateJWT ], Rol.getByIdUser);
router.get('/getAll', Rol.getAll);
  
module.exports = router;