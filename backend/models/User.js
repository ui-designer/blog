const mongoose = require("mongoose");


const userRegisterSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    gender:String,
    image:String,
    phone:Number,
    address:String
});


module.exports = mongoose.model("userregistered", userRegisterSchema);