const express = require('express');
const verifyToken = require('../utils/verifyUser');
const router = express.Router();
const { 
    createComment,
    getPostComments
 } = require('../controllers/commentController');


router.post('/create', verifyToken, createComment);
router.get('/getPostComments/:postId', getPostComments);

module.exports = router;