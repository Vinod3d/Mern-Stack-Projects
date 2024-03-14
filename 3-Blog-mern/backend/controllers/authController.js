const User = require('../modals/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const {attachCookiesToResponse, createTokenUser, createJWT} = require('../utils')


const register = async(req, res) =>{
  try {
      const isExisting = await User.findOne( {email: req.body.email } );
      if(isExisting){
        throw new CustomError.BadRequestError( "Email already in use" ) ;
      }

      const user = await User.create({...req.body});
      const {password, ...rest} = user._doc
      attachCookiesToResponse({res, user: rest})

      res.status(StatusCodes.CREATED).json({user: rest});
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

const login = async(req, res) =>{
 try {
    const user = await User.findOne({email : req.body.email});
    if (!user) {
      throw new CustomError.UnauthenticatedError('Invalid Credentials');
    }

    const isPasswordCorrect = await user.comparePassword(req.body.password);
    if (!isPasswordCorrect) {
      throw new CustomError.UnauthenticatedError('Invalid Credentials');
    }

    const {password, ...rest} = user._doc
    attachCookiesToResponse({ res, user: rest });
  
    res.status(StatusCodes.OK).json({ user: rest});
    
 } catch (error) {
  return res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
 }
};

const logout = async(req, res) => {
  res.send('logout')
};



module.exports =  {
    register, login, logout
};