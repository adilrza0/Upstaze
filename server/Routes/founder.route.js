const express = require('express');
const Profile = require('../Models/founder.model');
const founderRouter = express.Router();


// Create a new profile
founderRouter.post('/', async (req, res) => {
    console.log(req.body)
  try {
    const check = await Profile.findOne({userId:req.auth?.userId})
    if(check){
      return res.status(401).json({message:"user Already exist"})
    }
    const profile = new Profile({...req.body,userId:req.auth?.userId});
    await profile.save();
    res.status(201).send(profile);
  } catch (error) {
    console.log(error)
    res.status(400).send(error);
  }
});

// Get all profiles
founderRouter.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.status(200).send(profiles);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a single profile by ID
founderRouter.get('/:id', async (req, res) => {
 
  try {
    const profile = await Profile.findOne({userId:req.auth.userId});
    if (!profile) {
      return res.status(404).send();
    }
    res.status(200).send(profile);
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
});

// Update a profile by ID
founderRouter.put('/:id', async (req, res) => {
  try {
    const profile = await Profile.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!profile) {
      return res.status(404).send();
    }
    res.status(200).send(profile);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a profile by ID
founderRouter.delete('/:id', async (req, res) => {
  try {
    const profile = await Profile.findByIdAndDelete(req.params.id);
    if (!profile) {
      return res.status(404).send();
    }
    res.status(200).send(profile);
  } catch (error) {
    res.status(500).send(error);
  }
}); 

founderRouter.post("/find-coFounders",async(req,res)=>{
  console.log(req.body)
  try {
    // Extract filters from req.body
    const {  skills, locations, experience } = req.body;

    // Build the query object
    const query = {};

    // Add filters to the query if they are provided

    

    if (skills && Array.isArray(skills) && skills.length > 0) {
      query['skills'] = { $in: skills };
    }

    if (locations && Array.isArray(locations) && locations.length > 0) {
      query['location'] = { $in: locations };
    }

    if (experience) {
      query['experience'] = experience;
    }

    // Execute the query
    const founders = await Profile.find(query);
    // console.log(startups)

    // Send the found startups as a response
    res.json(founders);
  } catch (error) {
    console.error('Error finding startups:', error);
    res.status(500).json({ message: 'Server error' });
  }

})

module.exports = founderRouter;
