const express = require("express");
const connection = require("./db");
const cors = require("cors")

require("dotenv").config()
const {ClerkExpressRequireAuth} = require("@clerk/clerk-sdk-node");
const router = require("./Routes");
const path =require('path')
const app = express()

const PORT=process.env.PORT ||4500
const buildpath = path.resolve(__dirname, "../client/dist"); // Absolute path to the dist directory

// Serve static files from the dist directory
app.use(express.static(buildpath));

// Enable CORS for all routes
app.use(cors());

// API routes
app.use(express.json())

app.use("/api", router);

// Serve index.html for all non-API and non-static file routes
app.get("*", (req, res) => {
  res.sendFile(path.resolve(buildpath, "index.html")); // Absolute path to index.html
});


  

app.listen(PORT, async()=>{
    await connection
    console.log("connected to DB")
    console.log(`server running at port ${PORT}`)
})