const express = require('express');
const router = express.Router();
const verifyToken = require('../utils/verifyUser');

const {
  updateUser,
  deleteUser,
  signOut,
  getUsers
} = require('../controllers/userController');

router.put('/update/:userId', verifyToken, updateUser);
router.delete('/delete/:userId', verifyToken, deleteUser);
router.post('/signout', verifyToken, signOut);
router.get('/getusers', verifyToken, getUsers);


module.exports = router;
