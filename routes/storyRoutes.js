/// Dependecies ///
const express = require('express');

const router = express.Router();
const storyController = require('../controllers/storyController');

/// Routes ///
router
    .route('/')
    .get(storyController.getAllStories)
    .post(storyController.postStory)
    .delete(storyController.deleteAllStories);

router
    .route('/:id')
    .get(storyController.getStory) /// read a story
    .put(storyController.updateStory) /// edit a story
    .delete(storyController.deleteStory);

module.exports = router;
