const express = require('express');
const router = express.Router();
const { authenticateUser, authorizePermissions } = require('../middleware/authentication');

const {
  createBlog,
  updateBlog,
  getAllBlog, 
  getSingleBlog, 
  featuredBlog,
  likedBlog,
  deleteBlog
} = require('../controllers/blogController');


router
  .route('/')
  .post(authenticateUser, createBlog)
  .get(authenticateUser, getAllBlog);

router
  .route('/featured')
  .get(authenticateUser, featuredBlog);


router
  .route('/:id')
  .get(authenticateUser, getSingleBlog)
  .patch(authenticateUser, updateBlog)
  .delete(authenticateUser, deleteBlog);

  
  router
  .route('/likeBlog/:id')
  .get(authenticateUser, likedBlog);
  


  module.exports = router