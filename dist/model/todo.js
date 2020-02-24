"use strict";

var mongoose = require("mongoose");

var schemaTodo = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        minlength: 5
    }
});

var Todo = mongoose.model("Todo", schemaTodo);

module.exports = Todo;