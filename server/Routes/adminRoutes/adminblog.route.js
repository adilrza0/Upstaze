const express =require('express');
const Blog = require('../../Models/blog.model');
const blogRouter =express.Router();
 

blogRouter.post("/", async(req,res)=>{
    try {
        const blog = new Blog(req.body)
        await blog.save()
    } catch (error) {
        console.log(error);
        res.status(400).json({error})
    }
})


module.exports=blogRouter