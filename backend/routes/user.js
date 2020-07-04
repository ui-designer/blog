const express = require("express");
const router = require("express").Router();
const userRegister = require("../models/User");
const tokenVerify = require("../routes/verifyToken");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var multer  = require('multer')
var path = require('path');

router.use(express.static(__dirname+"./public/"))

var Storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix+path.extname(file.originalname) );
    }
});

  var upload = multer({
      storage:Storage
  }).single('image');

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
        phone:req.body.phone,
        gender:req.body.gender,
        password:hashedPassword,
        image:req.file,
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

    const token = jwt.sign({_id:userExist._id,name:userExist.name}, process.env.TOKEN_SECRET, { expiresIn:  6*60*60 });

    res.header("auth-token", token).send({_id:userExist._id,name:userExist.name,token: token});

});


router.post("/tokenValidate", async (req,res)=>{
    
    jwt.verify(req.body.token, process.env.TOKEN_SECRET, function(err, decoded) {
        if(!err){
            res.send(decoded);
        }else{
            res.send(err);
        }
      });
      
});



router.post("/userNameExist", async (req,res)=>{
        const nameExist = await userRegister.findOne({name:{ $regex:`^${req.body.name}$`, $options: "i"}});
        if(nameExist) {
            res.send("true");
        }else {
            res.send("false");
        }
   
});

router.post("/userEmailExist", async (req,res)=>{
    const emailExist = await userRegister.findOne({email:{ $regex:`^${req.body.email}$`, $options: "i"}});
    if(emailExist) {
        res.send("true");
    }else {
        res.send("false");
    }

});


router.post("/userPhoneExist", async (req,res)=>{
    const phoneExist = await userRegister.findOne({phone:req.body.phone});
    if(phoneExist) {
        res.send("true");
    }else {
        res.send("false");
    }

});




/// Updation routers

router.post("/updateNameVerify/:userId", async (req,res)=>{
    const nameExist = await userRegister.findOne({_id:{ $ne: req.params.userId}, name:{ $regex:`^${req.body.name}$`, $options: "i"}});
   //res.send(nameExist);

    if(nameExist) {
        res.send("true");
    }else {
        res.send("false");
    }

});

router.post("/updateEmailVerify/:userId", async (req,res)=>{
    const emailExist = await userRegister.findOne({_id:{ $ne: req.params.userId}, email:{ $regex:`^${req.body.email}$`, $options: "i"}});
   //res.send(emailExist);

    if(emailExist) {
        res.send("true");
    }else {
        res.send("false");
    }

});


router.post("/updatePhoneVerify/:userId", async (req,res)=>{
    const phoneExist = await userRegister.findOne({_id:{ $ne: req.params.userId}, phone:req.body.phone});
   //res.send(phoneExist);

    if(phoneExist) {
        res.send("true");
    }else {
        res.send("false");
    }

});




router.get('/profile/:userId', tokenVerify, async (req,res)=>{
    try {
        const userProfile = await userRegister.findById(req.params.userId);
       res.send(userProfile);
    } catch (error) {
        res.send({message:error})
    }

});




router.patch('/editProfile/:userId', upload, tokenVerify, async (req,res)=>{
    const file = req.file;
    console.log(file)
      userRegister.updateOne(
          { "_id": req.params.userId}, // Filter
          {$set: {"name": req.body.name,"email": req.body.email,"phone": req.body.phone,"gender": req.body.gender}}, // Update
          {new: true},
          function (err, response) {
            // Handle any possible database errors
            if (err) {
              console.log("we hit an error" + err);
              res.json({
                message: 'Database Update Failure'
              });
            }else{
              res.send(response)
            }
          }
        );
   

  

});



router.patch('/upload/:userId', upload, tokenVerify, async (req,res)=>{
      const file = req.file.filename;
      console.log(file);
        userRegister.updateMany(
            { "_id": req.params.userId},
            {$set: {"image": `http://localhost:4000/images/${file}`}}, 
            {new: true},
            function (err, response) {
              if (err) {
                console.log("we hit an error" + err);
                res.json({
                  message: 'Database Update Failure'
                });
              }else{
                res.send(response)
              }
            }
          );
     
  
    

});



module.exports = router;