const express = require('express');
const {
  test,
  updateUser,
  deleteUser,
} = require('../controller/userController.js');
// import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/', test);
router.post('/update/:id', updateUser);
router.delete('/delete/:id',  deleteUser);

module.exports = router;
