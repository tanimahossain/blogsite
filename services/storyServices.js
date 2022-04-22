const Story = require('../models/storiesModel');
const authController = require('../controllers/authController');
const negotiate = require('../utilities/contentNegotiation');

/// For a single user///
exports.getStory = async (req, res, next) => {
    await Story.findAll({
        where: {
            storyId: req.params.id,
        },
    })
        .then((storyData) => {
            const Data = {
                status: 'User data fetched sucessfully',
                storyData,
            };
            negotiate.negotiateData(Data, req, res, next);
        })
        .catch((err) => {
            res.status(200).send(`User did was not found ${err}`);
        });
};

exports.postStory = async (req, res, next) => {
    let mx = 0;
    let payload;
    console.log(req.headers);
    try {
        payload = await authController.parseToken(req, res, next);
    } catch (err) {
        res.status(400).send(`did not get payload ${err}`);
    }
    await Story.max('storyNo', {
        where: { authorUsername: payload.userName },
    })
        .then((stryNo) => {
            mx = stryNo + 1;
        })
        .catch((err) => {
            res.status(200).send(`there was a problem. ${err}`);
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
    await Story.create(storyInfo)
        .then(() => {
            const Data = {
                status: 'success',
                message: 'story Created Succesfully.',
                storyId: storyInfo.storyId,
                authorName: storyInfo.authorName,
                storyTitle: storyInfo.storyTitle,
                openingLines: storyInfo.openingLines,
            };
            negotiate.negotiateData(Data, req, res, next);
        })
        .catch((err) => {
            res.status(200).send(`Could not create story ${err}`);
        });
};

exports.updateStory = async (req, res, next) => {
    const storyInfo = req.body;
    console.log('updatestory', req.params.id);
    if (req.body.storyDescription) {
        storyInfo.openingLines = `${req.body.storyDescription.slice(0, 100)}...`;
    }
    await Story.update(req.body, {
        where: {
            storyId: req.params.id,
        },
    })
        .then(() => {
            const Data = {
                status: 'success',
                message: 'Story updated Successfully',
            };
            negotiate.negotiateData(Data, req, res, next);
        })
        .catch((err) => {
            res.status(200).send(`Could not update story ${err}`);
        });
};

exports.deleteStory = async (req, res, next) => {
    await Story.destroy({
        where: {
            storyId: req.params.id,
        },
    })
        .then(() => {
            const Data = {
                status: 'success',
                message: 'Story deleted Successfully',
            };
            negotiate.negotiateData(Data, req, res, next);
        })
        .catch((err) => {
            res.status(200).send(`Could not delete story ${err}`);
        });
};

/// For all the stories///
exports.deleteAllStories = async (req, res, next) => {
    await Story.destroy({
        truncate: true,
    })
        .then(() => {
            res.status(200).send('All stories deleted Succesfully.');
        })
        .catch((err) => {
            res.status(200).send(`Could not delete story ${err}`);
        });
};

exports.getAllStories = async (req, res, next) => {
    console.log(req);
    await Story.findAll({
        attributes: { exclude: ['storyDescription'] },
    })
        .then((storyData) => {
            const Data = {
                status: 'success',
                message: 'Story fetched Successfully',
                storyData,
            };
            negotiate.negotiateData(Data, req, res, next);
        })
        .catch((err) => {
            res.status(200).send(`Could not create story ${err}`);
        });
};
