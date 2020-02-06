const express = require("express");
const Todo = require("../model/todo")
const router = express.Router();

router.route("/todo")
  .get(async(req,res)=>{
    const sorted = req.query.sort;

    const todos= await Todo.find().sort({text:sorted});
    res.render("todo", {todos});
  })

  .post( async (req, res)=>{
  const todo = new Todo({
          text: req.body.text,
      })
    await todo.save( (error, sucess )=> {
     if (error) {
      console.log(error);
      res.send(error.message)
     } else 
     res.redirect("/todo")
   } );
  })

  router.route("/delete/:id")
    .get(async(req, res)=>{
      
    console.log(req.params.id);
    await Todo.deleteOne({_id:req.params.id});
    res.redirect("/todo");
  })
  
  router.route("/update/:id")
  .get(async(req,res)=>{
  
//hämta specifik data från databasen
  const response = await Todo.findById({_id:req.params.id})
//sen skicka till edit sidan
  res.render("edit", {response})
  })
  
  .post(async(req, res)=>{    
//använd updateOne metoden för att kunna redigera kommentarerna

  await Todo.updateOne({_id:req.body._id}, 
    {$set: {text:req.body.text}}, {runValidators:true}, (err)=>{
      err? res.send(err.message): res.redirect("/todo")
    })
  console.log(req.body);
})

  
  module.exports = router;