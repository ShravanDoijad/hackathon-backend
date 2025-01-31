const userModel = require('../models/user-model')
const userService = require('../services/user-service')
const {validationResult} = require('express-validator')
const BlackListToken = require('../models/blackListTokenModel')
module.exports.registerUser = async (req, res, next) => { 
    try {
        const errors = validationResult(req);
                console.log(req.body)
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }
        
                
        
        const {username, email, password, phone} = req.body;
        const userExist = await userModel.findOne({ email });
                if (userExist) {
                  return res.status(400).json({ message: "Email already exists" });
                }
        const hashedPassword = await userModel.hashPassword(password)
        const user = await userService.createUser({
           username,
            email,
            phone,
            password: hashedPassword,
        })
        console.log(req.body);
        

        const token  = user.generateAuthToken();
        res.cookie('token', token)
        res.status(201).json({token, user})

    } catch (error) {
        console.log("error from the user controller", error);
        res.status(400).json({msg: error})
    }


 }

 module.exports.loginUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
                console.log(req.body)
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }
        const {email, password} = req.body;
        const loguser = await userModel.findOne({email}).select("+password")
        const isMatch = await loguser.comparePassword(password)
        if (!loguser || !isMatch) {
            return res.status(400).json({msg: "Invalid email or password"})
        }

        const token = await loguser.generateAuthToken()
        res.cookie('token', token)
        res.status(200).json({token, user: loguser})
    } catch (error) {
        console.log("error from the user controller", error);
        res.status(400).json({msg: error})
    }}

    module.exports.Logoutuser = async (req, res, next) => {
        res.clearCookie('token');
        const token  = req.cookies.token || req.headers.authorization.split(" ")[1];
        await BlackListToken.create({token})
        res.status(200).json({msg: "Logged out successfully"})
      }