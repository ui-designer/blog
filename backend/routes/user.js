const router = require("express").Router();
const userRegister = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req,res) =>{

    const emailExist = await userRegister.findOne({
        email:req.body.email
    });

    const phoneExist = await userRegister.findOne({
        phone:req.body.phone
    });

    if(emailExist) return res.status(400).send("Email ID is Already Exist");
    if(phoneExist) return res.status(400).send("Phone Number is Already Exist");


    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const registeredUser = new userRegister({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword,
        gender:req.body.gender,
        userImagePath:req.body.userimage,
        phone:req.body.phone,
        address:req.body.address
    });
    
    try {
        const userTable = await registeredUser.save();
        res.send(userTable);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post("/login", async (req,res) =>{    
    const userExist = await userRegister.findOne({
        email:req.body.email
    });

    if(!userExist) return res.status(400).send("Email is not Registed. Please Signup!!");


    const passwordValid = await  bcrypt.compare(req.body.password, userExist.password);

    if(!passwordValid) return res.status(400).send("Invalid Password");

    // create auth-token 

    const token = jwt.sign({_id:userExist._id}, process.env.TOKEN_SECRET);

    res.header("auth-token", token).send({_id:userExist._id,token: token});




    // try {
    //     const userTable = await registeredUser.save();
    //     res.send(userTable);
    // } catch (error) {
    //     res.status(400).send(error);
    // }
});






module.exports = router;