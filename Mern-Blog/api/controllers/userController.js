const User = require('../modals/User');

const getAllUsers = async (req, res)=>{
    // res.send("get all users");
    req.json(req.body)
}

const getSingleUser = async (req, res)=>{

}

const showCurrentUser = async (req, res)=>{

};

const updateUser = async (req, res)=>{

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




// const updateUser = async (req, res)=>{
//     const {email, name} = req.body;
//     if(!email || !name){
//         throw new CustomError.BadRequestError('Please provide all values');
//     }

//     const user = await User.findOneAndUpdate(
//         {_id: req.user.userId},
//         {email, name},
//         {new: true, runValidators : true}
//     );
//     const tokenUser = createTokenUser(user);
//     attachCookiesToResponse({res, user:tokenUser});
//     res.status(StatusCodes.OK).json({ user: tokenUser });
// }