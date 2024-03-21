const User = require('../models/User.js');
const bcryptjs = require('bcryptjs');
const errorHandler = require('../utils/error.js');
const jwt = require('jsonwebtoken');

const signup = async (req, res, next) => {
   const {username, email, password} = req.body;
   const hashedPassword = bcryptjs.hashSync(password, 10); 
   const newUser = new User({username, email, password: hashedPassword});
   try {
       await newUser.save();
       res.status(201).json({message: 'User created successfully'});
   } catch (error) {
    next(error);
   }
};

const signin = async (req, res, next) => {
    const {email, password} = req.body;
    try {
        const validUser = await User.findOne({email});
        if(!validUser) return next(errorHandler(404, 'User not found'));
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, 'wrong credentials'));
        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME});
        const {password: hashedPassword, ...rest} = validUser._doc;
        res.cookie('access_token', token, {httpOnly: true}).status(200).json({rest})
    } catch (error) {
        next(error);
    }
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