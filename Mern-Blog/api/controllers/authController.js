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
    res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || 'Something went wrong' });
  }
};

const google = async (req, res, next) => {
  const {email, name, googlePhotoUrl} = req.body;
  try {
    const user = await User.findOne({ email });
    if(user){
      const tokenUser = createTokenUser({ ...newUser.toObject(), profilePicture: googlePhotoUrl });
      attachCookiesToResponse({ res, tokenUser });
      delete tokenUser.password;
      res.status(StatusCodes.OK).json({ success: true, user: tokenUser });
    } else{
      const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)

      const user = await User.create({ name, email, password : generatedPassword, profilePicture: googlePhotoUrl });
      delete user.password;
      res.status(StatusCodes.CREATED).json({ user });
    }
  } catch (error) {
    
  }
  
}





const logout = async(req, res) => {
   
};



module.exports =  {
    signup, signin, google, logout
};