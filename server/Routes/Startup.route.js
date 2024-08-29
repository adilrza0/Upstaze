const express = require('express');
const Startup = require('../Models/startup.model');
const Profile = require('../Models/founder.model');

const startUpRouter = express.Router();


// Create a new startup
startUpRouter.post('/', async (req, res) => {
  
  
  try {
    const founder = await Profile.findOne({userId:req.auth.userId})
    const newStartup = new Startup({...req.body,founder: founder._id, userId:req.auth.userId});
    const savedStartup = await newStartup.save();
    console.log(newStartup)
    res.status(201).json(savedStartup);
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: err.message });
  }
});
startUpRouter.post("/find-startups",async(req,res)=>{
  console.log(req.body)
  try {
    // Extract filters from req.body
    const { stages, industries, locations, fundingStatus } = req.body;

    // Build the query object
    const query = {};

    // Add filters to the query if they are provided

    if (stages && Array.isArray(stages) && stages.length > 0) {
      query['productService.stage'] = { $in: stages };
    }

    if (industries && Array.isArray(industries) && industries.length > 0) {
      query['industryAndMarket.industry'] = { $in: industries };
    }

    if (locations && Array.isArray(locations) && locations.length > 0) {
      query['contact.location'] = { $in: locations };
    }

    if (fundingStatus) {
      query['financialInfo.fundingStatus'] = fundingStatus;
    }

    // Execute the query
    const startups = await Startup.find(query);
    // console.log(startups)

    // Send the found startups as a response
    res.json(startups);
  } catch (error) {
    console.error('Error finding startups:', error);
    res.status(500).json({ message: 'Server error' });
  }

})


// Get all startups
startUpRouter.get('/', async (req, res) => {
  try {
    const startups = await Startup.find();
    res.json(startups);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
startUpRouter.get('/my-startups', async (req, res) => {
  try {
    const startups = await Startup.find({userId:req.auth.userId});
    res.json(startups);
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message });
  }
});


// Get a single startup by ID
startUpRouter.get('/:id', async (req, res) => {
  try {
    const startup = await Startup.findById(req.params.id);
    if (startup == null) {
      return res.status(404).json({ message: 'Cannot find startup' });
    }
    res.json(startup);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a startup by ID
startUpRouter.put('/:id', async (req, res) => {
  try {
    const updatedStartup = await Startup.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedStartup == null) {
      return res.status(404).json({ message: 'Cannot find startup' });
    }
    res.json(updatedStartup);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a startup by ID
startUpRouter.delete('/:id', async (req, res) => {
  try {
    const startup = await Startup.findByIdAndDelete(req.params.id);
    if (startup == null) {
      return res.status(404).json({ message: 'Cannot find startup' });
    }
    res.json({ message: 'Startup deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



module.exports = startUpRouter;
