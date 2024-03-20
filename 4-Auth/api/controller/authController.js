const User = require('../models/User.js');
const bcryptjs = require('bcryptjs');
// import { errorHandler } from '../utils/error.js';
// import jwt from 'jsonwebtoken';

const signup = async (req, res, next) => {
   const {username, email, password} = req.body;
   const hashedPassword = bcryptjs.hashSync(password, 10); 
   const newUser = new User({username, email, password: hashedPassword});
   try {
       await newUser.save();
       res.status(201).json({message: 'User created successfully'});
   } catch (error) {
    res.status(500).json(error.message);
   }
};

const signin = async (req, res, next) => {
    res.send("signIn User")
};

const google = async (req, res, next) => {
    res.send("google User")
};

const signout = (req, res) => {
    res.send("signout User")
};


module.exports =  {
    signup, signin, google, signout
};