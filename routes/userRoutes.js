const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

router
    .route('/')
    .get(userController.getAllUsers)
    .post(userController.signUp)
    .delete(userController.deleteAllUsers);

router
    .route('/:id')
    .get(userController.getUser) /// view a profile
    .put(authController.authorize, userController.updateUser)
    .delete(authController.authorize, userController.deleteUser);

router.route('/logIn').post(authController.logIn);

module.exports = router;
