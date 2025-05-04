const { Router } = require('express');
const Auth = require('../controllers/auth');
const router = Router();

router.post('/login', Auth.login);

module.exports = router;