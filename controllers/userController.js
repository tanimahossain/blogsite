/// Dependencies///
const userServices = require('../services/userServices');
/// Dependencies///

/// For all Users///
exports.getAllUsers = (req, res, next) => {
    console.log(req.body);
    userServices.getAllUsers(req, res, next);
};

exports.deleteAllUsers = (req, res, next) => {
    userServices.deleteAllUsers(req, res, next);
};

/// For a single user///
exports.getUser = (req, res, next) => {
    userServices.getUser(req, res, next);
};
exports.signUp = (req, res, next) => {
    console.log(req.body);
    userServices.signUp(req, res, next);
};

exports.updateUser = (req, res, next) => {
    console.log(req.body);
    userServices.updateUser(req, res, next);
};

exports.deleteUser = (req, res, next) => {
    userServices.deleteUser(req, res, next);
};
