const express = require('express');
const router = express.Router();
const verifyToken = require('../utils/verifyUser');

const {
  getAllUsers,
  updateUser,
} = require('../controllers/userController');

router.get('/', getAllUsers);
router.put('/update/:userId', verifyToken, updateUser);


module.exports = router;
