const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")



const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.generateAuthToken = function()  { 
    const token = jwt.sign({
        _id: this._id
    },
    process.env.JWT_SECRET ,
    {expiresIn : "24h"}   
)
    return token;
 }

 userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10)
}
const userModel = mongoose.model("user", userSchema)

module.exports = userModel;