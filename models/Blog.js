const mongoose = require('mongoose');


const BlogSchema = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    intro : {
        type : String,
        required : true
    },
    body : {
        type : String,
        required : true  
    },

},{timestamps:true})//blogs create or update can fix value auto

const Blog = mongoose.model('Blog',BlogSchema);//blogs collection
module.exports = Blog;