const router = require('express').Router();
const users = require('./users');
const ads = require('./ads');

const { authController } = require('../controllers');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

router.use('/users', users);
router.use('/ads', ads);

module.exports = router;
