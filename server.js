import express from "express"
import { engine } from "express-handlebars"; ///?Importing handlebars
import mongoose from 'mongoose';
import methodOverride from "method-override";

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// let post = require("./Routes/routes")
import post from "./Routes/routes.js"; //! importing all routes from routes directory


let app = express(); //?Creates an Express application. The express() function is a top-level function exported by the express module.

//!implementing Template engine(handlebars) into the application
app.set("view engine" , "handlebars");
app.engine("handlebars" , engine());

//! Serve static folders and files :
app.use(express.static( __dirname + "/public"));
app.use(express.static( __dirname + "/node_modules"))

//? MONGODB connection using mongoose.
let local_mongodb_url = "mongodb://localhost:27017/POST";
mongoose.connect( local_mongodb_url , err => {
    if(err) throw err;
    console.log("Successfully database connected");
});


//Parse form data(req.body)
app.use(express.urlencoded({extended : true}));

// override with POST with PUT and DELETE Using methodOveride module
app.use(methodOverride('_method'));

//Route for home page
app.get("/" , (req , res) => {
    res.render("./home") //? render() is used for rendering of template engines
});

//all routes should call here
app.use("/post" , post)

app.listen(5000 , err=> {
    if(err) throw err;
    console.log(("Server is running on port number 5000"));
})