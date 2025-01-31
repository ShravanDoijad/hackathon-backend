const express = require('express')
const router = express.Router()
const authmiddleware = require("../middleware/auth-middleware")
const { body, } = require("express-validator")
const usercontroller = require('../controllers/user-controller')


router.post('/register', [
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('username').isLength({ min: 3 }).withMessage('username must be at least 3 characters long'),
    body('phone').isLength({ min: 10 }, { max: 10 }).withMessage("enter the valid phone number"),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')],
    usercontroller.registerUser
)
router.post('/login', [
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')],

    usercontroller.loginUser)
router.post('/logout', authmiddleware.userAuth, usercontroller.Logoutuser)  

module.exports = router