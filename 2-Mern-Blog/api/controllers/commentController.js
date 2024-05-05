const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const Comment = require('../modals/Comment');

const createComment = async (req, res, next) =>{
    try {
        const {content, postId, userId} = req.body;

        if(userId !== req.user.id){
            return next(CustomError.UnauthorizedError("You are not allowed to create this comment"));
        }

        const newComment = new Comment({
            content,
            postId,
            userId,
        });

        await newComment.save();
        res.status(200).json(newComment);
    } catch (error) {
        next(error);
    }
}

const getPostComments = async (req, res, next)=>{
    try {
        const comments = await Comment.find({postId: req.params.postId}).sort({
            createdAt: -1,
        });
        res.status(StatusCodes.OK).json(comments);
    } catch (error) {
        next(error)
    }
}

module.exports =  {
    createComment,
    getPostComments
};