const userModel = require('../models/user-model')
const userService = require('../services/user-service')
const {validationResult} = require('express-validator')


module.exports.registerUser = async (req, res, next) => { 
    try {
        const errors = validationResult(req);
                console.log(req.body)
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }
        
        
        
        const {username, email, password, phone} = req.body;
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