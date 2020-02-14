const express = require("express");
const mongoose = require("mongoose");
const todoRouter = require("./router/todoRouter");
const sassMiddleware = require("node-sass-middleware");
const config = require("./config/config")
const path = require("path");
const app = express();


//middleware

app.use(express.urlencoded({
    extended: true
}))

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs")


//en till middleware för css

app.use(sassMiddleware({
    src: path.join(__dirname, "scss"),
    dest: path.join(__dirname, "public")
}))

//router 

app.use(todoRouter)


//listen to port 
const port = process.env.PORT || 8005;
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
}
mongoose.connect(config.databaseURL, options).then(() => {
    console.log("Du lyckades!")
    //app is listening to port 
    app.listen(port);
})

module.exports = app