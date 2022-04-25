/// Dependencies ///
const storyServices = require('../services/storyServices');
/// Dependencies ///

/// For all Stories///
exports.getAllStories = (req, res, next) => {
    storyServices.getAllStories(req, res, next);
};

exports.deleteAllStories = (req, res, next) => {
    storyServices.deleteAllStories(req, res, next);
};

/// For a single story///
exports.getStory = (req, res, next) => {
    storyServices.getStory(req, res, next);
};

exports.postStory = (req, res, next) => {
    storyServices.postStory(req, res, next);
};

exports.updateStory = (req, res, next) => {
    storyServices.updateStory(req, res, next);
};

exports.deleteStory = (req, res, next) => {
    storyServices.deleteStory(req, res, next);
};
