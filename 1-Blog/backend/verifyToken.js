const jwt=require('jsonwebtoken')

const verifyToken= async(req,res,next)=>{
    const token= await req.cookies.token
    // console.log(token)
    if(!token){
        return res.status(401).json("You are not authenticated!")
    }
    jwt.verify(token,process.env.SECRET,async (err,data)=>{
        if(err){
            return res.status(403).json("Token is not valid!")
        }
        
        req.userId=data._id
       
        // console.log("passed")gd;g;jd;
        
        next()
    })
}

module.exports=verifyToken