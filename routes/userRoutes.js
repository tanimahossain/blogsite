
const express = require('express');
const router = express.Router();
const userController = require('./../controllers/userController');
router
    .route('/')
    .get(userController.getAllUsers)
    .post(userController.postAllUsers)
    .delete(userController.deleteAllUsers);
router
    .route('/:id')
    .get(userController.getUser)
    .post(userController.postUser)
    .put(userController.updateUser)
    .delete(userController.deleteUser);
module.exports = router;
