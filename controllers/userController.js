/// Dependencies///
const userServices = require('../services/userServices');
/// Dependencies///

/// For all Users///
exports.getAllUsers = (req, res) => {
    console.log(req.body);
    userServices.getAllUsers(req, res);
};

exports.deleteAllUsers = (req, res) => {
    userServices.deleteAllUsers(req, res);
};

/// For a single user///
exports.getUser = (req, res) => {
    userServices.getUser(req, res);
};
exports.signUp = (req, res) => {
    console.log(req.body);
    userServices.signUp(req, res);
};

exports.updateUser = (req, res) => {
    console.log(req.body);
    userServices.updateUser(req, res);
};

exports.deleteUser = (req, res) => {
    userServices.deleteUser(req, res);
};
