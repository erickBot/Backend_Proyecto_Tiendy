const { Router } = require('express');
const CalificationStore = require('../controllers/calification_store');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();

router.post('/create', [ validateJWT ], CalificationStore.create);
router.get('/getByIdStore/:id_store', [ validateJWT ], CalificationStore.getByIdStore);

module.exports = router;