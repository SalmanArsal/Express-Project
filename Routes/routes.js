import express from "express";
import mongoose from "mongoose";

let app = express();

//**  START ALL get routes //
app.get("/create" , (req , res) => {
    res.render("./create-post")
})

app.get("/edit" , (req , res) => {
    res.render("./edit-post")
})

app.get("/fetch" , (req , res) => {
    // res.render("./fetch-post")
    POST.find({})
    .lean() // it helps in converting mongo documents into js objects so that we can iterate and display data
    .then( posts => {
        // console.log(posts); 
        res.render("./fetch-post" , {posts});
    }).catch( err => console.log(err));
    
});

//? fetch individual post:
app.get("/edit/:id" , (req , res) => {
    POST.findOne({_id: req.params.id})
    .lean()
    .then( post => {
        // console.log(post);
        res.render("./edit-post" , { post })
    }).catch( err => console.log(err));
})
//**  END ALL get routes //

//? Defining mongoose Schema.
let Schema = mongoose.Schema;

let PostSchema = new Schema(
    {
        title:{
            type:String,
            required : true
        },
        details:{
            type:String,
            required : true
        }
    }
)

let POST = mongoose.model("POST" , PostSchema);

//**  START  post route //

app.post("/create-post" , (req , res) => {
    // res.send("OK");
    // console.log(req.body); // undefined

    let { title , details} = req.body;

    let newpost = {title , details}

    //save data in database
    new POST(newpost).save().then(
        res.redirect("/post/fetch" , 301 )
    ).catch(
        err => console.log(err)
    );
})
//**  END  post route //


//* PUT route starts here
app.put("/edit/:id" , (req , res) => {
    POST.findOne({_id : req.params.id})
    .then( editpost => {
        editpost.title = req.body.title;
        editpost.details = req.body.details;

    // save updated data inthe database
     editpost.save()
     .then( () => {
         res.redirect("/post/fetch");
     })
     .catch( err => console.log(err));

    })
    .catch(err => console.log(err));
})
//* PUT route end here

//*DELETE route Starts
app.delete("/delete/:id" , (req , res ) => {
    POST.remove({_id: req.params.id})
    .then(  () => {
        res.redirect("/post/fetch");
    }).catch(err => { console.log(err);})
})

//*DELETE route ends
export default app;