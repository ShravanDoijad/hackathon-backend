const BlackListToken = require('../models/blackListTokenModel');
const usermodel= require('../models/user-model')
const jwt = require('jsonwebtoken')

const userAuth = async(req, res, next)=>{
    try {
        const token=  req.cookies.token || req.headers.authorization?.split(" ")[1]
        ;
        if(!token){
            return res.status(400).json({msg:"No token provided"})

        }

        const isblacklisted = await BlackListToken.findOne({token: token});
        if(isblacklisted){
            return res.status(400).json({msg: "Token has been blacklisted"})
        }
     
            const decoded =  jwt.verify(token, process.env.JWT_SECRET)
            const user = await usermodel.findById(decoded._id);
            if(!user){
                return res.status(400).json({msg:"No user found"})
            }
            req.user = user;
            return next();
        
    } catch (error) {
        res.status(401).json({msg: "Please authenticate"})
        console.log(error);
        
    }
}

module.exports = {userAuth}
