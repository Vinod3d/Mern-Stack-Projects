const express = require('express');
const router = express.Router();
const verifyToken = require('../utils/verifyUser'); 
const {
    create,
    getposts,
    deletepost
} =  require("../controllers/postController");

router.post('/create', verifyToken, create)
router.get('/getposts', getposts)
router.delete('/deletepost/:postId/:userId', verifyToken, deletepost)

module.exports = router;