const User = require('../modals/User');
const CustomError = require('../errors');
const { StatusCodes } = require('http-status-codes');
const bcryptjs = require('bcryptjs');

const getAllUsers = async (req, res)=>{
    res.send("get all users");
}

const getSingleUser = async (req, res)=>{

}

const showCurrentUser = async (req, res)=>{

};

const updateUser = async (req, res, next)=>{
    const { userId } = req.params;
    const { name, email, profilePicture, password } = req.body;

    if (req.user.id !== userId) {
        return next(new CustomError.UnauthenticatedError('You are not allowed to update this user'));
    }

    if (password) {
        if (password.length < 6) {
            return next(new CustomError.BadRequestError('Password must be at least 6 characters long'));
        }

        req.body.password = bcryptjs.hashSync(password, 10);
    };
      
    if (name) {
        if (name.length < 3 || name.length > 20) {
            return next(new CustomError.BadRequestError('User Must be between 7 and 20 characters'));
        }
        if (name.includes(' ')) {
            return next(new CustomError.BadRequestError('name cannot contain spaces'));
        }
        if (name !== name.toLowerCase()) {
            return next(new CustomError.BadRequestError('name must be lowercase'));
        }
        if (!name.match(/^[a-zA-Z0-9]+$/)) {
            return next(new CustomError.BadRequestError('name can only contain letters and numbers'));
        }
    };

    try {
        const updatedUser = await User.findByIdAndUpdate(
          userId,
          { name, email, profilePicture, password: req.body.password },
          { new: true }
        );

        const { password: _, ...rest } = updatedUser._doc;

        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
}

const updateUserPassword = async (req, res)=>{

}

module.exports = {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword
}