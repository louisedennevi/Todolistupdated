const mongoose = require("mongoose");


const schemaComment = new mongoose.Schema(
    {
        text: {type:String, required:true, minlength:5},
    }
)

const Comment = mongoose.model("Comment", schemaComment);

module.exports = Comment;