/// Dependencies ///
const authController = require('../controllers/authController');
const Story = require('../models/storiesModel');
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
    if (req.body.authorUserName) {
        return next(new AppError("You can't change the owner of the post", 403));
    }
    if (req.body.storyId || req.body.storyNo) {
        return next(new AppError("You can't change story identifier", 403));
    }
    return next();
};
