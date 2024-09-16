const { ClerkExpressRequireAuth } = require("@clerk/clerk-sdk-node");
const express =require("express");
const founderRouter = require("./founder.route");
const startUpRouter = require("./Startup.route");
const systemHealthRouter = require("./systemHealth.route");
const adminRouter = require("./admin.route");

const router =express.Router()

router.use("/profile",ClerkExpressRequireAuth(),founderRouter)
router.use('/startup',ClerkExpressRequireAuth(),startUpRouter)
router.use("/system-health",systemHealthRouter)
router.use('/admin',adminRouter)



module.exports= router