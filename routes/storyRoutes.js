
const express = require('express');
const router = express.Router();
const storyController = require('./../controllers/storyController');

///***For all Stories***///
router
    .route('/')
    .get(storyController.getAllStories)
    .post(storyController.postAllStories)
    .delete(storyController.deleteAllStories);
///***For all Stories***///

///***For a single Story***///
router
    .route('/:id')
    .get(storyController.getStory)
    .post(storyController.postStory)
    .put(storyController.updateStory)
    .delete(storyController.deleteStory);
module.exports = router;
///***For a single Story***///
