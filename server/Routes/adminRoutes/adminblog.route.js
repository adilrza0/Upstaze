const express =require('express');
const Blog = require('../../Models/blog.model');
const blogRouter =express.Router();
 

blogRouter.post("/", async(req,res)=>{
    
    try {
        const blog = new Blog(req.body)
        await blog.save()
        res.status(200).json({message:"blog posted",blog})
    } catch (error) {
        console.log(error);
        res.status(400).json({error})
    }
})

blogRouter.get('/',async (req,res)=>{
    try {
        const blogs= await Blog.find()
        res.status(200).json({blogs})
    } catch (error) {
        console.log(error)
        res.status(400).json({error})
    }
})


module.exports=blogRouter