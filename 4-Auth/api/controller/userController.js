const User = require('../models/User.js');
// import { errorHandler } from '../utils/error.js';
// import bcryptjs from 'bcryptjs';

const test = (req, res) => {
  res.json({
    message: 'API is working!',
  });
};

// update user

const updateUser = async (req, res, next) => {
  res.send("update User")
};


// delete user


const deleteUser = async (req, res, next) => {
    res.send("delete User")
}


module.exports =  {
    test, updateUser, deleteUser
};