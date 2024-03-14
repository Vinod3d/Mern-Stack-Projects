const Blog = require("../modals/Blog")
const { StatusCodes } = require('http-status-codes');

const createBlog = async(req, res)=>{
    try {
        const blog = await Blog.create({ ...req.body, userId: req.user._id });
        res.status(StatusCodes.CREATED).json({blog});
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
}

const updateBlog = async(req,res)=> {
    try {
        const blog = await Blog.findById(req.params.id)
        if(blog.userId !== req.user.id){
            throw new Error("You can update only your own posts")
        }

        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
        .populate('userId', '-password')

        return res.status(StatusCodes.OK).json(updatedBlog);
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
}


const getAllBlog = async(req, res) => {
    try {
        const blogs = await Blog.find({}).populate("userId", '-password')
        return res.status(StatusCodes.OK).json(blogs);
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
}

const getSingleBlog = async(req, res)=>{
    try {
        const {id: blogId} = req.params
        const  blog = await Blog.findById(blogId).populate("userId", '-password')
        blog.views+=1
        await blog.save()
        return res.status(StatusCodes.OK).json(blog);
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
}

const getFeaturedBlog = async(req, res)=>{
    try {
        const  blogs = await Blog.find({featured: true}).populate("userId", 'password').limit(3)
        return res.status(StatusCodes.OK).json(blogs);
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
}


const likedBlog = async(req, res)=> {
    try {
        const blog = await Blog.findById(req.params.id)
        if(blog.likes.includes(req.user.id)){
            blog.likes = blog.likes.filter((userId)=> userId !== req.user.id)
            await blog.save()

            return res.status(StatusCodes.OK).json({msg: 'Successfully unliked the blog'})
        } else{
            blog.likes.push(req.user.id)
            await blog.save()
            
            return res.status(StatusCodes.CREATED).json({msg:'Liked Successfully!'});
        }
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
}


const deleteBlog = async(req, res)=>{
    try {
        const blog = await Blog.findById(req.params.id)
        if(blog.userId !== req.user.id){
            throw new Error("You are not authorized to perform this action")
        }

        await Blog.findByIdAndDelete(req.params.id)

        return res.status(StatusCodes.OK).json({msg: "Successfully deleted the blog"})
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
}

module.exports = {
    createBlog, updateBlog, getAllBlog, getSingleBlog, getFeaturedBlog, likedBlog, deleteBlog
}