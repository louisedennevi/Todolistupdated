const express = require("express");
const Comment = require("../model/comment")
const router = express.Router();


//comment(data) och ska visa den till comment router
//create
//skapa comment med post router och en ejs input fält (för torsdag)

router.route("/comment")
  .get(async(req,res)=>{
    const sorted = req.query.sort;

    const comments = await Comment.find().sort({text:sorted});
    res.render("comment", {comments});
  })

  .post( async (req, res)=>{
  const comment = new Comment({
          text: req.body.text,
          author: req.body.author
      })
    await comment.save( (error, sucess )=> {
     if (error) {
      console.log(error);
      res.send(error.message)
     } else 
     res.redirect("/comment")
   } );
  })

  router.route("/delete/:id")
    .get(async(req, res)=>{
      
    console.log(req.params.id);
    await Comment.deleteOne({_id:req.params.id});
    res.redirect("/comment");
  })
  
  router.route("/update/:id")
  .get(async(req,res)=>{
  
//hämta specifik data från databasen
  const response = await Comment.findById({_id:req.params.id})
//sen skicka till edit sidan
  res.render("edit", {response})
  })
  
  .post(async(req, res)=>{    
//använd updateOne metoden för att kunna redigera kommentarerna

  await Comment.updateOne({_id:req.body._id}, 
    {$set: {text:req.body.text, author:req.body.author}}, {runValidators:true}, (err)=>{
      err? res.send(err.message): res.redirect("/comment")
    })
  console.log(req.body);
})

  
  module.exports = router;