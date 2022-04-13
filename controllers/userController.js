///dependencies///
const userServices = require('./../services/userServices.js');
///dependencies///

///For all Users///
exports.getAllUsers = (req,res) => {
    console.log(req.body);
    userServices.getAllUsers(req,res);
};

exports.deleteAllUsers = (req,res) => {
    userServices.deleteAllUsers(req,res);
};
///For all users///

///For a single user///
exports.getUser = (req,res) => {
    console.log(req.body);
    userServices.getUser(req,res);
};
exports.postUser = (req,res) => {
    console.log(req.body);
    userServices.createUser(req,res);
    
};

exports.updateUser = (req,res) => {
    console.log(req.body);
    userServices.updateUser(req,res);
};

exports.deleteUser = (req,res) => {
    userServices.deleteUser(req,res);
};
///For a single user///