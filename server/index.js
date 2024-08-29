const express = require("express");
const connection = require("./db");
const cors = require("cors")

require("dotenv").config()
const {ClerkExpressRequireAuth} = require("@clerk/clerk-sdk-node");
const router = require("./Routes");
const path =require('path')
const app = express()

const PORT=process.env.PORT ||4500
const _dirname=path.dirname("");
const buildpath= path.join(_dirname,"../client/dist")
app.use(express.static(buildpath))
app.use("*",cors())
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist', 'index.html'));
// });

app.use(express.json())

  app.use("/api",router)
  

app.listen(PORT, async()=>{
    await connection
    console.log("connected to DB")
    console.log(`server running at port ${PORT}`)
})