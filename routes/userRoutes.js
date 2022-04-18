
const express = require('express');
const router = express.Router();
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
router
    .route('/')
    .get(userController.getAllUsers) ///all users read
    .post(userController.signUp) ///user create
    .delete(userController.deleteAllUsers); ///all users delete
router
    .route('/:id')
    .get(userController.getUser) ///user read
    .put(authController.authorize, userController.updateUser) ///user update
    .delete(authController.authorize, userController.deleteUser); ///user delete
module.exports = router;
