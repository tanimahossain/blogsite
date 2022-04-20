const Story = require('../models/storiesModel');

/// For a single user///
exports.getStory = async (req, res) => {
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
            res.status(200).send(Data);
        })
        .catch((err) => {
            res.status(200).send(`User did was not found ${err}`);
        });
};

exports.postStory = async (req, res) => {
    let mx = 0;
    await Story.max('storyNo', {
        where: { authorUsername: req.body.authorUsername },
    })
        .then((stryNo) => {
            mx = stryNo + 1;
        })
        .catch((err) => {
            res.status(200).send(`there was a problem. ${err}`);
        });
    const storyInfo = {
        storyId: `${req.body.authorUsername}_${mx}`,
        storyNo: mx,
        authorUsername: req.body.authorUsername,
        authorName: req.body.authorName,
        storyTitle: req.body.storyTitle,
        openingLines: `${req.body.storyDescription.slice(0, 100)}...`,
        storyDescription: req.body.storyDescription,
    };
    await Story.create(storyInfo)
        .then(() => {
            res.status(200).send('story Created Succesfully.');
        })
        .catch((err) => {
            res.status(200).send(`Could not create story ${err}`);
        });
};

exports.updateStory = async (req, res) => {
    const storyInfo = req.body;
    if (req.body.storyDescription) {
        storyInfo.openingLines = `${req.body.storyDescription.slice(0, 100)}...`;
    }
    await Story.update(req.body, {
        where: {
            storyId: req.params.id,
        },
    })
        .then(() => {
            res.status(200).send('Story updated Succesfully.');
        })
        .catch((err) => {
            res.status(200).send(`Could not update story ${err}`);
        });
};

exports.deleteStory = async (req, res) => {
    await Story.destroy({
        where: {
            storyId: req.params.id,
        },
    })
        .then(() => {
            res.status(200).send('Story deleted Succesfully.');
        })
        .catch((err) => {
            res.status(200).send(`Could not delete story ${err}`);
        });
};

/// For all the stories///
exports.deleteAllStories = async (req, res) => {
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

exports.getAllStories = async (req, res) => {
    console.log(req);
    await Story.findAll({
        attributes: { exclude: ['storyDescription'] },
    })
        .then((storyData) => {
            const Data = {
                status: 'Story data fetched sucessfully',
                storyData,
            };
            res.status(200).send(Data);
        })
        .catch((err) => {
            res.status(200).send(`Could not create story ${err}`);
        });
};
