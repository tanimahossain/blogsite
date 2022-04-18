
const express = require('express');
const router = express.Router();
const userController = require('./../controllers/userController');
router
    .route('/')
    .get(userController.getAllUsers) ///all users read
    .post(userController.signUp) ///user create
    .delete(userController.deleteAllUsers); ///all users delete
router
    .route('/:id')
    .get(userController.getUser) ///user read
    .put(userController.updateUser) ///user update
    .delete(userController.deleteUser); ///user delete
module.exports = router;
