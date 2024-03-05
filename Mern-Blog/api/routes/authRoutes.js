const express = require('express');
const router = express.Router();

const { signup, signin, google, logout } = require('../controllers/authController');

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/google', google);

router.get('/logout', logout);

module.exports = router;
