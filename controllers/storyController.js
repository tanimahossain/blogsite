/// Dependencies ///
const negotiate = require('../utilities/contentNegotiation');
const catchAsync = require('../utilities/catchAsync');
const storyServices = require('../services/storyServices');
/// Dependencies ///

/// For all Stories///
exports.getAllStories = catchAsync(async (req, res, next) => {
    const Data = await storyServices.getAllStories(req, res, next);
    await negotiate.negotiateData(Data, req, res, next);
});

// exports.deleteAllStories = (req, res, next) => {
//     storyServices.deleteAllStories(req, res, next);
// };

/// For a single story///
exports.getStory = catchAsync(async (req, res, next) => {
    const Data = await storyServices.getStory(req, res, next);
    await negotiate.negotiateData(Data, req, res, next);
});

exports.postStory = catchAsync(async (req, res, next) => {
    const Data = await storyServices.postStory(req, res, next);
    await negotiate.negotiateData(Data, req, res, next);
});

exports.updateStory = catchAsync(async (req, res, next) => {
    const Data = await storyServices.updateStory(req, res, next);
    await negotiate.negotiateData(Data, req, res, next);
});

exports.deleteStory = catchAsync(async (req, res, next) => {
    const Data = await storyServices.deleteStory(req, res, next);
    await negotiate.negotiateData(Data, req, res, next);
});
