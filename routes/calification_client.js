const { Router } = require('express');
const CalificationClient = require('../controllers/calification_client');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();

router.post('/create', [ validateJWT ], CalificationClient.create);
router.get('/getByIdClient/:id_client', [ validateJWT ], CalificationClient.getByIdClient);

module.exports = router;