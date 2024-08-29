const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  userId:{type:String,required: true, unique:true},
  dob: { type: Date },
  city: { type: String },
  occupation: { type: String },
  position: { type: String },
  role: { type: String },
  bio: { type: String },
  motivation: { type: String },
  lookingFor: { type: String },
  offering: { type: String },
  achievement: { type: String },
  experience: { type: String },
  industries: [{ type: String }],
  location:{type:String},
  strengths: { type: String },
  skills: [{ type: String }],
  interests: { type: String },
  slogan: { type: String },
  why: [{ type: String }],
  availibility: { type: String },
  
  blog: { type: String },
  website: { type: String },
  facebook: { type: String },
  linkedin: { type: String },
  twitter: { type: String },
  pinterest: { type: String },
  youtube: { type: String },
  
 
});

const Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;
