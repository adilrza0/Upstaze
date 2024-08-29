const { ClerkExpressRequireAuth } = require("@clerk/clerk-sdk-node");
const express =require("express");
const founderRouter = require("./founder.route");
const startUpRouter = require("./Startup.route");

const router =express.Router()

router.use("/profile",ClerkExpressRequireAuth(),founderRouter)
router.use('/startup',ClerkExpressRequireAuth(),startUpRouter)



module.exports= router