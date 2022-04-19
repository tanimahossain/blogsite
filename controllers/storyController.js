/// Dependencies ///
const storyServices = require('../services/storyServices');
/// Dependencies ///

/// For all Stories///
exports.getAllStories = (req, res) => {
    console.log(req.body);
    storyServices.getAllStories(req, res);
};

exports.deleteAllStories = (req, res) => {
    storyServices.deleteAllStories(req, res);
};

/// For a single story///
exports.getStory = (req, res) => {
    console.log(req.body);
    storyServices.getStory(req, res);
};
exports.postStory = (req, res) => {
    console.log(req.body);
    storyServices.postStory(req, res);
};

exports.updateStory = (req, res) => {
    console.log(req.body);
    storyServices.updateStory(req, res);
};

exports.deleteStory = (req, res) => {
    storyServices.deleteStory(req, res);
};
