/// Dependecies ///
const express = require('express');

const router = express.Router();
const storyController = require('../controllers/storyController');
const auth = require('../controllers/authController');
const storyMiddlewares = require('../middlewares/storyMiddlewares');

/// Routes ///
router
    .route('/')
    .get(storyController.getAllStories)
    .post(auth.authorize, storyMiddlewares.creatable, storyController.postStory);
// .delete(storyController.deleteAllStories);

router
    .route('/:id')
    .get(storyController.getStory)
    .put(
        auth.authorize,
        storyMiddlewares.updatable,
        storyMiddlewares.matchUser,
        // eslint-disable-next-line comma-dangle
        storyController.updateStory
    ) /// edit a story
    .delete(auth.authorize, storyMiddlewares.matchUser, storyController.deleteStory);

module.exports = router;
