const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");


dotenv.config();

//connect to db
mongoose.connect(
    process.env.DB_CONNECT,
{ useNewUrlParser: true, useUnifiedTopology: true } ,
()=>console.log("Connected To DB"))


//Import Routes
const userRoutes = require("./routes/user");


//Middlewares
app.use(express.json());

//Routes Middleware
app.use("/api/user", userRoutes);


app.listen(4000, () => console.log("Server Starts"))