const Story = require('../models/storiesModel');
const authController = require('../controllers/authController');
const negotiate = require('../utilities/contentNegotiation');
const catchAsync = require('../utilities/catchAsync');

/// For a single user///
exports.getStory = catchAsync(async (req, res, next) => {
    await Story.findAll({
        where: {
            storyId: req.params.id,
        },
    }).then((storyData) => {
        const Data = {
            status: 'User data fetched sucessfully',
            storyData,
        };
        negotiate.negotiateData(Data, req, res, next);
    });
});

exports.postStory = catchAsync(async (req, res, next) => {
    let mx = 0;
    let payload;
    console.log(req.headers);
    await authController.parseToken(req, res, next).then((val) => {
        payload = val;
    });
    await Story.max('storyNo', {
        where: { authorUsername: payload.userName },
    }).then((stryNo) => {
        mx = stryNo + 1;
    });
    const storyInfo = {
        storyId: `${payload.userName}_${mx}`,
        storyNo: mx,
        authorUsername: payload.userName,
        authorName: req.body.authorName,
        storyTitle: req.body.storyTitle,
        openingLines: `${req.body.storyDescription.slice(0, 100)}...`,
        storyDescription: req.body.storyDescription,
    };
    await Story.create(storyInfo).then(() => {
        const Data = {
            status: 'success',
            message: 'story Created Succesfully.',
            storyId: storyInfo.storyId,
            authorName: storyInfo.authorName,
            storyTitle: storyInfo.storyTitle,
            openingLines: storyInfo.openingLines,
        };
        negotiate.negotiateData(Data, req, res, next);
    });
});

exports.updateStory = catchAsync(async (req, res, next) => {
    const storyInfo = req.body;
    if (req.body.storyDescription) {
        storyInfo.openingLines = `${req.body.storyDescription.slice(0, 100)}...`;
    }
    await Story.update(req.body, {
        where: {
            storyId: req.params.id,
        },
    }).then(() => {
        const Data = {
            status: 'success',
            message: 'Story updated Successfully',
        };
        negotiate.negotiateData(Data, req, res, next);
    });
});

exports.deleteStory = catchAsync(async (req, res, next) => {
    await Story.destroy({
        where: {
            storyId: req.params.id,
        },
    }).then(() => {
        const Data = {
            status: 'success',
            message: 'Story deleted Successfully',
        };
        negotiate.negotiateData(Data, req, res, next);
    });
});

/// For all the stories///
exports.deleteAllStories = catchAsync(async (req, res, next) => {
    await Story.destroy({
        truncate: true,
    }).then(() => {
        res.status(200).send('All stories deleted Succesfully.');
    });
});

exports.getAllStories = catchAsync(async (req, res, next) => {
    await Story.findAll({
        attributes: { exclude: ['storyDescription'] },
    }).then((storyData) => {
        const Data = {
            status: 'success',
            message: 'Story fetched Successfully',
            storyData,
        };
        negotiate.negotiateData(Data, req, res, next);
    });
});
