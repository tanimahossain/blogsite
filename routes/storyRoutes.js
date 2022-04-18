///Dependecies///
const express = require('express');
const router = express.Router();
const storyController = require('./../controllers/storyController');
const authController = require('./../controllers/authController');
///Dependencies///

router
    .route('/')
    .get(storyController.getAllStories) ///all stories read
    .post(authController.authorize, storyController.postStory) ///post a story
    .delete(storyController.deleteAllStories); ///all stories delete

router
    .route('/:id')
    .get(storyController.getStory) ///read a story
    .put(authController.authorize, storyController.updateStory) /// edit a story
    .delete(authController.authorize, storyController.deleteStory); ///delete a story

module.exports = router;
