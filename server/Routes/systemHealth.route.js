const express= require("express")
const os = require("os")
const osUtils = require("os-utils")

const promClient = require('prom-client');
const winston = require('winston');
const mongoose = require('mongoose');
const fs = require('fs');


const systemHealthRouter = express.Router()
const Registry = promClient.Registry;
const register = new Registry();

// Collect default metrics (CPU, memory, etc.)
promClient.collectDefaultMetrics({ register });

// Custom metrics
const httpDuration = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.5, 1, 2, 5, 10]
});

const httpErrors = new promClient.Counter({
  name: 'http_requests_errors_total',
  help: 'Total number of HTTP requests that resulted in an error',
  labelNames: ['method', 'route']
});
systemHealthRouter.use((req, res, next) => {
    const end = httpDuration.startTimer();
    res.on('finish', () => {
      end({ method: req.method, route: req.route ? req.route.path : '', status_code: res.statusCode });
      if (res.statusCode >= 400) {
        httpErrors.inc({ method: req.method, route: req.route ? req.route.path : '' });
      }
    });
    next();
  });


systemHealthRouter.get("/",async (req,res)=>{
    
    try {
    
      
        // API Performance Metrics
        const metrics = register.metrics();
        
        // Database Health
        const db = mongoose.connection.db;
        const collectionStats = await db.command({ collStats: 'Upstaze' });
        //const dbStatus =await mongoose.connection.db.collection('Upstaze').stats(); // await mongoose.connection.db.admin().serverStatus();
    
        // Error Logs
        const errorLogs = fs.readFileSync('error.log', 'utf8');
    
        // Server Health
        
        osUtils.cpuUsage(function (cpuPercentage) {
        
            const memoryUsage = process.memoryUsage().heapUsed / 1024 / 1024; // Convert to MB
            const totalMemory = os.totalmem() / 1024 / 1024; // Convert to MB
            const freeMemory = os.freemem() / 1024 / 1024; // Convert to MB
            const uptime = os.uptime(); // System uptime in seconds
            const loadAverage = os.loadavg(); // Load averages for 1, 5, 15 minutes
        
            const serverHealth = {
              cpuUsage: (cpuPercentage * 100).toFixed(2) + '%',
              memoryUsage: memoryUsage.toFixed(2) + ' MB',
              totalMemory: totalMemory.toFixed(2) + ' MB',
              freeMemory: freeMemory.toFixed(2) + ' MB',
              uptime: uptime + ' seconds',
              loadAverage: loadAverage, // e.g., [0.11, 0.22, 0.33]
            };
            
            res.json({
                apiPerformance: metrics,
                databaseHealth:collectionStats,
              //   databaseHealth: {
              //     connections: dbStatus.connections,
              //     uptime: dbStatus.uptime
              //   },
                  
                errorLogs: errorLogs,
                serverHealth: serverHealth
              });
          });
        
      } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'An error occurred while fetching status' });
      }
})


module.exports=systemHealthRouter








