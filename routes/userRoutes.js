/// Dependencies ///
const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../controllers/authController');

/// Routes ///
router
    .route('/')
    .get(userController.getAllUsers)
    .post(userController.signUp)
    .put(auth.authorize, userController.updateUser)
    .delete(auth.authorize, userController.deleteUser);

router.route('/:id').get(userController.getUser);
router.route('/logIn').post(auth.logIn);

module.exports = router;
