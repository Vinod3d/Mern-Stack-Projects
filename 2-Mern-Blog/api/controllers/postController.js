const CustomError = require('../errors');
const { StatusCodes } = require('http-status-codes');
const Post = require('../modals/PostModal');

const create = async(req, res, next)=>{
    if(!req.user.isAdmin){
        return next(new CustomError.UnauthenticatedError("You are not allowed to create a post"));
    }

    if(!req.body.title || !req.body.content){
        return next(new CustomError.BadRequestError('Please provide all required fields'))
    }

    const slug = req.body.title
        .split(' ')
        .join('-')
        .toLowerCase()
        .replace(/[^a-zA-Z0-9-]/g, '-');

    const newPost = new Post( {
        ...req.body,
        slug,
        userId: req.user.id,
    });

    try {
        const savedPost = await newPost.save();
        res.status(StatusCodes.OK).json(savedPost);
    } catch (error) {
        next(error);
    }
}


module.exports = {
    create,

}