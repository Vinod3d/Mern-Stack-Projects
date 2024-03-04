const User = require('../modals/User');
const CustomError = require('../errors');
const { StatusCodes } = require('http-status-codes');
const { createTokenUser, attachCookiesToResponse } = require('../utils');



const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const emailAlreadyExists = await User.findOne({ email });

    if (emailAlreadyExists) {
      throw new CustomError.BadRequestError('Email already exists');
    }
    
    const user = await User.create({ name, email, password });
    res.status(StatusCodes.CREATED).json({ user });
  } catch (error) {
    // Handle the error here
    res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message || 'Something went wrong, try again later',
    });
  }
};



const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new CustomError.BadRequestError('Please provide email and password');
    }

    // Validate email format here if necessary

    const user = await User.findOne({ email });

    if (!user) {
      throw new CustomError.UnauthenticatedError('Invalid email or password');
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new CustomError.UnauthenticatedError('Invalid email or password');
    }

    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({ res, tokenUser });

    delete tokenUser.password;
    
    res.status(StatusCodes.OK).json({ success: true, user: tokenUser });
  } catch (error) {
    // Handle errors gracefully
    console.error(error); // Log the error for debugging
    res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || 'Something went wrong' });
  }
};


const logout = async(req, res) => {
   
};



module.exports =  {
    signup, signin, logout
};