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



  
  module.exports = router;