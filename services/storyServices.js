const Story = require('../models/storiesModel');
const AppError = require('../middlewares/appError');

/// For a single user///
exports.getStory = async (req, res, next) => {
    let Data;
    Data = await Story.findOne({
        attributes: { exclude: ['storyNo'] },
        where: {
            storyId: req.params.id.trim(),
        },
    });
    if (Data !== null && !Data) {
        return next(new AppError(`Something went wrong`, 500));
    }
    req.status = 200;
    Data = {
        status: 'success',
        message: 'User data fetched sucessfully',
        storyData: Data,
    };
    if (!Data.storyData) {
        return next(new AppError(`No such Story`, 404));
    }
    req.status = 200;
    return Data;
};

exports.postStory = async (req, res, next) => {
    let mx = 0;
    mx = await Story.max('storyNo', {
        where: { authorUsername: req.payload.userName },
    });
    if (typeof mx === 'undefined') {
        return next(new AppError('Something went wrong', 500));
    }
    mx += 1;
    const storyInfo = {
        storyId: `${req.payload.userName}-${mx}`,
        storyNo: mx,
        authorUsername: req.payload.userName,
        authorName: req.body.authorName.trim(),
        storyTitle: req.body.storyTitle.trim(),
        openingLines: `${req.body.storyDescription.slice(0, 100)}...`,
        storyDescription: req.body.storyDescription,
    };
    await Story.create(storyInfo);
    const Data = {
        status: 'success',
        message: 'Story Created Succesfully.',
        storyId: storyInfo.storyId,
        authorName: storyInfo.authorName,
        storyTitle: storyInfo.storyTitle,
        openingLines: storyInfo.openingLines,
    };
    req.status = 201;
    return Data;
};

exports.updateStory = async (req, res, next) => {
    const storyInfo = req.body;
    if (req.body.storyDescription) {
        storyInfo.openingLines = `${req.body.storyDescription.slice(0, 100)}...`;
    } else {
        storyInfo.openingLines = req.body.storyDescription;
    }
    if (storyInfo.authorName) storyInfo.authorName = storyInfo.authorName.trim();
    else storyInfo.authorName = req.body.authorName;
    if (storyInfo.storyTitle) storyInfo.storyTitle = storyInfo.storyTitle.trim();
    else storyInfo.storyTitle = req.body.storyTitle;
    await Story.update(storyInfo, {
        where: {
            storyId: req.params.id.trim(),
        },
    });
    const Data = {
        status: 'success',
        message: 'Story updated Successfully',
    };
    req.status = 200;
    return Data;
};

exports.deleteStory = async (req, res, next) => {
    await Story.destroy({
        where: {
            storyId: req.params.id.trim(),
        },
    });
    const Data = {
        status: 'success',
        message: 'Story deleted Successfully',
    };
    req.status = 200;
    return Data;
};

/// For all the stories///
// exports.deleteAllStories = catchAsync(async (req, res, next) => {
//     await Story.destroy({
//         truncate: true,
//     }).then(() => {
//         res.status(200).send('All stories deleted Succesfully.');
//     });
// });

exports.getAllStories = async (req, res, next) => {
    let Data;
    Data = await Story.findAll({
        attributes: { exclude: ['storyDescription', 'storyNo'] },
    });
    if (!Data) return next(new AppError("Can't serve the data you wanted", 500));
    Data = {
        status: 'success',
        message: 'Stories fetched Successfully',
        count: Data.length,
        storyData: Data,
    };
    if (Data.count === 0) {
        Data.message = 'No Stories to fetch';
    }
    req.status = 200;
    return Data;
};
