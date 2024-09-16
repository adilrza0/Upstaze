const express = require('express')
const blogRouter = require('./adminRoutes/adminblog.route')

const adminRouter= express.Router()


adminRouter.use("/blog",blogRouter)

module.exports=adminRouter