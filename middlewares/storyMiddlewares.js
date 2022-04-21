/// Dependencies ///
const authController = require('../controllers/authController');
const Story = require('../models/storiesModel');

exports.matchUser = async (req, res, next) => {
    let payload;
    console.log(req.headers);
    await authController
        .parseToken(req, res)
        .then((userData) => {
            payload = userData;
        })
        .catch((err) => res.status(401).send(`log in ${err}`));

    console.log(payload);
    await Story.findOne({
        attributes: ['authorUsername'],
        where: {
            storyId: req.params.id,
        },
    })
        .then((storyData) => {
            console.log('storydata: ', storyData.authorUsername, payload.userName);
            if (!storyData.authorUsername) {
                return res.status(401).send('No such story');
            }
            if (storyData.authorUsername !== payload.userName) {
                return res.status(401).send('Not your story');
            }
            return next();
        })
        .catch((err) => res.status(200).send(`User did was not found ${err}`));
};
