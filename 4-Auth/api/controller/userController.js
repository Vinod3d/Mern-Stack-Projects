const User = require('../models/User.js');
const errorHandler = require('../utils/error.js');
const bcryptjs = require('bcryptjs');

const test = (req, res) => {
  res.json({
    message: 'API is working!',
  });
};

// update user

const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can update only your account!'));
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
        },
      },
      { new: true }
    );
  
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};


// delete user


const deleteUser = async (req, res, next) => {
    res.send("delete User")
}


module.exports =  {
    test, updateUser, deleteUser
};