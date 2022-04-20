const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

router
    .route('/')
    .get(userController.getAllUsers)
    .post(userController.signUp)
    .put(authController.authorize, userController.updateUser)
    .delete(authController.authorize, userController.deleteUser);

router.route('/:id').get(userController.getUser); /// view a profile
router.route('/logIn').post(authController.logIn);

module.exports = router;
