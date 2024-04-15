const express = require('express');
const router = express.Router();
const verifyToken = require('../utils/verifyUser');

const {
  getAllUsers,
  updateUser,
  deleteUser,
  signOut,
} = require('../controllers/userController');

router.get('/', getAllUsers);
router.put('/update/:userId', verifyToken, updateUser);
router.delete('/delete/:userId', verifyToken, deleteUser);
router.post('/signout', verifyToken, signOut);


module.exports = router;
