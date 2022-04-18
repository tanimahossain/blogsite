///dependencies///
const storyServices = require('./../services/storyServices.js');
///dependencies///

///For all Stories///
exports.getAllStories = (req,res) => {
    console.log(req.body);
    storyServices.getAllStories(req,res);
};

exports.deleteAllStories = (req,res) => {
    storyServices.deleteAllStories(req,res);
};
///For all Stories///

///For a single story///
exports.getStory = (req,res) => {
    console.log(req.body);
    storyServices.getStory(req,res);
};
exports.postStory = (req,res) => {
    console.log(req.body);
    storyServices.postStory(req,res);
    
};

exports.updateStory = (req,res) => {
    console.log(req.body);
    storyServices.updateStory(req,res);
};

exports.deleteStory = (req,res) => {
    storyServices.deleteStory(req,res);
};
///For a single story///