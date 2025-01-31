const mongoose = require("mongoose");
require('dotenv').config();
const uri = process.env.URI

const connectdb = async ()=>{
    try {
        await mongoose.connect(uri);
        console.log("connection successfull");
        
        
    } catch (error) {
        console.log("connection failed");
        
    }
}


module.exports = connectdb;
