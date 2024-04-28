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

const getposts = async(req, res, next)=>{
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.order === 'asc' ? 1 : -1;
        const posts = await Post.find({ 
            ...(req.query.userId && {userId: req.query.userId}),
            ...(req.query.category && {category: req.query.category}),
            ...(req.query.slug && {category: req.query.category}),
            ...(req.query.postId && {_id: req.query.postId}),
            ...(req.query.searchTerm && {
                $or: [
                    {title: {$regex: req.query.searchTerm, $options: 'i'}},
                    {content: {$regex: req.query.searchTerm, $options: 'i'}},
                ],
            }),
        })
        .sort({ updatedAt: sortDirection })
        .skip(startIndex)
        .limit(limit);

        const totalPosts = await Post.countDocuments();
        const now = new Date();
        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        );

        const lastMonthPosts = await Post.countDocuments({
            createdAt : {$gte : oneMonthAgo},
        });

        res.status(StatusCodes.OK).json({
            posts,
            totalPosts,
            lastMonthPosts,
        })
    } catch (error) {
        
    }
}


const deletepost = async (req, res, next) =>{
    if(!req.user.isAdmin || req.user.id !== req.params.userId){
        return next(CustomError.UnauthorizedError('You are not allowed to delete this post'));
    }
    
    try {
        await  Post.findByIdAndDelete(req.params.postId);
        res.status(StatusCodes.OK).json('The post has been deleted');
    } catch (error) {
        next(error.message);
    }
}

const updatepost = async(req, res, next)=>{
    if(!req.user.isAdmin || req.user.id !== req.params.userId){
        return next(CustomError.UnauthorizedError('You are not allowed to update this post'));
    }

    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.postId,
            {
              $set: {
                title: req.body.title,
                content: req.body.content,
                category: req.body.category,
                image: req.body.image,
              },
            },
            { new: true }
        );
        res.status(StatusCodes.OK).json(updatedPost);
    } catch (error) {
        next(error);
    }
}


module.exports = {
    create,
    getposts,
    deletepost,
    updatepost

}