const express = require('express');
const { signin, signup, google, signout } = require('../controller/authController.js');

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/google', google);
router.get('/signout', signout);

module.exports = router;
