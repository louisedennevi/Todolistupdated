"use strict";

var express = require("express");
var Todo = require("../model/todo");
var router = express.Router();

router.route("/todo").get(async function (req, res) {

  var currentPage = req.query.page || 1;
  var items = 3;

  var sorted = req.query.sort;

  var allTodos = await Todo.find();
  var threeTodos = await Todo.find().skip((currentPage - 1) * items).limit(items).sort({
    text: sorted
  });
  var pageCount = Math.ceil(allTodos.length / items);

  res.render("todo", {
    threeTodos: threeTodos,
    pageCount: pageCount,
    currentPage: currentPage
  });
}).post(async function (req, res) {
  var todo = new Todo({
    text: req.body.text
  });
  await todo.save(function (error, sucess) {
    if (error) {
      console.log(error);
      res.send(error.message);
    } else res.redirect("/todo");
  });
});

router.route("/delete/:id").get(async function (req, res) {

  console.log(req.params.id);
  await Todo.deleteOne({
    _id: req.params.id
  });
  res.redirect("/todo");
});

router.route("/update/:id").get(async function (req, res) {

  //hämta specifik data från databasen
  var response = await Todo.findById({
    _id: req.params.id
  });
  //sen skicka till edit sidan
  res.render("edit", {
    response: response
  });
}).post(async function (req, res) {
  //använd updateOne metoden för att kunna redigera kommentarerna


  await Todo.updateOne({
    _id: req.body._id
  }, {
    $set: {
      text: req.body.text
    }
  }, {
    runValidators: true
  }, function (err) {
    err ? res.send(err.message) : res.redirect("/todo");
  });
  console.log(req.body);
});

module.exports = router;