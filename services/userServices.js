/// Dependencies///
const User = require('../models/usersModel');
const hashString = require('../utilities/hashString');
const authController = require('../controllers/authController');
const negotiate = require('../utilities/contentNegotiation');
const catchAsync = require('../utilities/catchAsync');
/// Dependencies///

/// For a single user///
exports.getUser = catchAsync(async (req, res, next) => {
    await User.findAll({
        attributes: { exclude: ['password', 'createdAt', 'updatedAt', 'passChanged'] },
        where: {
            userName: req.params.id,
        },
    }).then((userData) => {
        const Data = {
            status: 'User data fetched sucessfully',
            userData,
        };
        negotiate.negotiateData(Data, req, res, next);
    });
});

exports.signUp = catchAsync(async (req, res, next) => {
    const hash = hashString.makeHash(req.body.password);
    console.log(hash, typeof hash);
    const userInfo = {
        userName: req.body.userName.toLowerCase(),
        fullName: req.body.fullName,
        eMail: req.body.eMail,
        password: (await hash).toString(),
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

        negotiate.negotiateData(Data, req, res, next);
    });
});

exports.updateUser = catchAsync(async (req, res, next) => {
    console.log(req.body);
    const userInfo = req.body;
    let msg = {
        status: 'User updated Succesfully.',
    };
    if (req.body.password) {
        userInfo.passChanged = Math.floor(Date.now() / 1000);
        const hash = hashString.makeHash(req.body.password);
        userInfo.password = (await hash).toString();
        const token = authController.getToken({ userName: userInfo.userName });
        msg = {
            status: 'User updated Succesfully.',
            token,
        };
    }
    const payload = await authController.parseToken(req, res, next);
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
        const Data = {
            status: 'User data fetched sucessfully',
            userData,
        };
        negotiate.negotiateData(Data, req, res, next);
    });
});
