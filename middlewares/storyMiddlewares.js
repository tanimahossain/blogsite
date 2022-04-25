/// Dependencies ///
const authController = require('../controllers/authController');
const Story = require('../models/storiesModel');
const User = require('../models/usersModel');
const catchAsync = require('../utilities/catchAsync');
const AppError = require('./appError');

exports.matchUser = catchAsync(async (req, res, next) => {
    let payload;
    console.log(req.headers);
    await authController.parseToken(req, res, next).then((userData) => {
        payload = userData;
    });

    await Story.findOne({
        attributes: ['authorUsername'],
        where: {
            storyId: req.params.id,
        },
    }).then((storyData) => {
        if (!storyData.authorUsername) {
            return next(new AppError('No such story', 404));
        }
        if (storyData.authorUsername !== payload.userName) {
            return next(new AppError('Not your story', 403));
        }
        return next();
    });
});

exports.updatable = (req, res, next) => {
    if (req.body.authorUsername) {
        return next(new AppError("You can't change the owner of the post", 403));
    }
    if (req.body.storyId || req.body.storyNo) {
        return next(new AppError("You can't change story identifier", 403));
    }
    let cnt = 0;
    const givenValues = Object.keys(req.body).length;
    if (req.body.authorName) cnt += 1;
    if (req.body.storyTitle) cnt += 1;
    if (req.body.storyDescription) cnt += 1;
    if (cnt !== givenValues) {
        return next(new AppError('You have given invalid data to update', 400));
    }
    return next();
};

exports.creatable = catchAsync(async (req, res, next) => {
    let cnt = 0;
    if (!req.body.authorName) {
        const payload = await authController.parseToken(req, res, next);
        const user = await User.findOne({
            attributes: ['fullName'],
            where: {
                userName: payload.userName,
            },
        });
        req.body.authorName = user.fullName;
        console.log(payload, req.body.authorName);
    }
    if (req.body.storyTitle) cnt += 1;
    if (req.body.storyDescription) cnt += 1;
    if (req.body.authorName) cnt += 1;
    const givenValues = Object.keys(req.body).length;
    if (cnt < 3) {
        return next(new AppError('You are missing necessary data for creating a post', 400));
    }
    if (cnt !== givenValues) {
        return next(new AppError('You have given invalid data for creating a post', 400));
    }
    return next();
});
