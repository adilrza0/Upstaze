const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
 
    title:{type: String},
    excerpt: {type:String},
    date: {type:String},
    readTime: {type:String},
    content:{type:String},
    image:{type:String}
   
});

const Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;
