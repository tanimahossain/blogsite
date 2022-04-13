///Dependecies///
const express = require('express');
const router = express.Router();
const storyController = require('./../controllers/storyController');
///Dependencies///

router
    .route('/')
    .get(storyController.getAllStories) ///all stories read
    .post(storyController.postStory) ///post a story
    .delete(storyController.deleteAllStories); ///all stories delete

router
    .route('/:id')
    .get(storyController.getStory) ///read a story
    .put(storyController.updateStory) /// edit a story
    .delete(storyController.deleteStory); ///delete a story

module.exports = router;
