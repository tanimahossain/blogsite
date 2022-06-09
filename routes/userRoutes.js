/// Dependencies ///
const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../controllers/authController');
const userMiddlewares = require('../middlewares/userMiddlewares');

/// Routes ///
router
    .route('/')
    .get(userController.getAllUsers)
    .post(userMiddlewares.creatable, userController.signUp)
    .put(auth.authorize, userMiddlewares.updatable, userController.updateUser)
    .delete(auth.authorize, userController.deleteUser);

router.route('/:id').get(userController.getUser);
router.route('/logIn').post(auth.logIn);
router.route('/verify').post(auth.authorize, userController.verify);

module.exports = router;
