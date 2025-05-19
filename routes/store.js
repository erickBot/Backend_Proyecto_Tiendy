const { Router } = require('express');
const Store = require('../controllers/store');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();

router.post('/create', [ validateJWT ], Store.create);
router.put('/update',  [ validateJWT ], Store.update);
router.get('/getAll',  [ validateJWT ], Store.getAll);
router.get('/getByIdUser/:id_user', [ validateJWT ], Store.getByIdUser);
router.delete('/delete/:id', [ validateJWT ], Store.delete);
  
module.exports = router;