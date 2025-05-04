const { Router } = require('express');
const User = require('../controllers/user');
const { validateJWT } = require('../middlewares/validate-jwt');
const { adminRol } = require('../middlewares/validate-roles');
const router = Router();

router.post('/register', User.create);
router.put('/update/:id',[ validateJWT ], User.update);
router.get('/getAll', [ validateJWT ], User.getAll);
router.delete('/delete/:id', [  validateJWT, adminRol], User.delete);
  
module.exports = router;