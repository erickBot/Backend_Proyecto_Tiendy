const { Router } = require('express');
const Auth = require('../controllers/auth');
const router = Router();

router.post('/login', Auth.login);
router.post('/logout/:id', Auth.logout);

module.exports = router;