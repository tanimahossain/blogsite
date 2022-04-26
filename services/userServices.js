/// Dependencies///
const User = require('../models/usersModel');
const authController = require('../controllers/authController');
const negotiate = require('../utilities/contentNegotiation');
const catchAsync = require('../utilities/catchAsync');
/// Dependencies///

/// For a single user///
exports.getUser = catchAsync(async (req, res, next) => {
    await User.findAll({
        attributes: { exclude: ['password', 'createdAt', 'updatedAt', 'passChanged'] },
        where: {
            userName: req.params.id.trim(),
        },
    }).then((userData) => {
        let Data = {
            status: 'success',
            message: 'User data fetched sucessfully',
            userData,
        };
        if (userData.length === 0) {
            req.status = 404;
            Data = {
                status: 'failed',
                message: 'No such user',
            };
        }
        negotiate.negotiateData(Data, req, res, next);
    });
});

exports.signUp = catchAsync(async (req, res, next) => {
    const userInfo = {
        userName: req.body.userName.toLowerCase().trim(),
        fullName: req.body.fullName.trim(),
        eMail: req.body.eMail.trim(),
        password: req.body.password.trim(),
        passChanged: Math.floor(Date.now() / 1000),
    };
    await User.create(userInfo).then(() => {
        const token = authController.getToken({ userName: userInfo.userName });
        const Data = {
            status: 'Sign Up completed successfully!',
            token,
            data: {
                userName: userInfo.userName,
                fullName: userInfo.fullName,
                eMail: userInfo.eMail,
            },
        };
        req.status = 201;
        negotiate.negotiateData(Data, req, res, next);
    });
});

exports.updateUser = catchAsync(async (req, res, next) => {
    console.log(req.body);
    const userInfo = req.body;
    let msg = {
        status: 'User updated Succesfully.',
    };
    const payload = await authController.parseToken(req, res, next);
    if (req.body.password) {
        userInfo.passChanged = Math.floor(Date.now() / 1000);
        userInfo.password = req.body.password;
        const token = authController.getToken({ userName: payload.userName });
        msg = {
            status: 'User updated Succesfully.',
            token,
        };
    }
    await User.update(userInfo, {
        where: {
            userName: payload.userName,
        },
    }).then(() => {
        negotiate.negotiateData(msg, req, res, next);
    });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
    const payload = await authController.parseToken(req, res, next);
    await User.destroy({
        where: {
            userName: payload.userName,
        },
    }).then(() => {
        const Data = {
            status: 'success',
            message: 'User deleted Successfully',
        };
        negotiate.negotiateData(Data, req, res, next);
    });
});

/// For all the users///
exports.deleteAllUsers = catchAsync(async (req, res, next) => {
    await User.destroy({
        truncate: true,
    }).then(() => {
        const Data = {
            status: 'success',
            message: 'All user deleted Successfully',
        };
        negotiate.negotiateData(Data, req, res, next);
    });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
    console.log(req.body);
    await User.findAll({
        attributes: { exclude: ['password', 'createdAt', 'updatedAt', 'passChanged'] },
    }).then((userData) => {
        let Data = {
            status: 'User data fetched sucessfully',
            userData,
        };
        if (userData.length === 0) {
            req.status = 404;
            Data = {
                status: 'failed',
                message: 'There are no user',
            };
        }
        negotiate.negotiateData(Data, req, res, next);
    });
});
