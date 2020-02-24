"use strict";

var express = require("express");
var mongoose = require("mongoose");
var todoRouter = require("./router/todoRouter");
var sassMiddleware = require("node-sass-middleware");
var config = require("./config/config");
var path = require("path");
var app = express();

//middleware

app.use(express.urlencoded({
    extended: true
}));

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

//en till middleware för css

app.use(sassMiddleware({
    src: path.join(__dirname, "scss"),
    dest: path.join(__dirname, "public")
}));

//router 

app.use(todoRouter);

//listen to port 
var port = process.env.PORT || 8005;
var options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
};
mongoose.connect(config.databaseURL, options).then(function () {
    console.log("Du lyckades!");
    //app is listening to port 
    app.listen(port);
});

module.exports = app;