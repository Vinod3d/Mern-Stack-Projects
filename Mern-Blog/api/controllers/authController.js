const User = require('../modals/User');
const CustomError = require('../errors');
const { StatusCodes } = require('http-status-codes');



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



const signin = async(req, res) =>{

};

const logout = async(req, res) => {
   
};



module.exports =  {
    signup, signin, logout
};