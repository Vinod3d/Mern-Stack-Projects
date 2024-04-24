const express = require('express');
const router = express.Router();
const verifyToken = require('../utils/verifyUser'); 
const {
    create,
    getposts,
} =  require("../controllers/postController");

router.post('/create', verifyToken, create)
router.get('/getposts', getposts)

module.exports = router;