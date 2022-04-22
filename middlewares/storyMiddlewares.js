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
            next(new AppError('No such story', 404));
        }
        if (storyData.authorUsername !== payload.userName) {
            next(new AppError('Not your story', 403));
        }
        next();
    });
});
