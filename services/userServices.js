/// Dependencies///
const User = require('../models/usersModel');
const authController = require('../controllers/authController');
const AppError = require('../middlewares/appError');
/// Dependencies///

/// For a single user///
exports.getUser = async (req, res, next) => {
    let Data;
    Data = await User.findOne({
        attributes: { exclude: ['password', 'createdAt', 'updatedAt', 'passChanged'] },
        where: {
            userName: req.params.id.trim(),
        },
    });
    if(Data !== null && !Data){
        return next(new AppError(`Something went wrong`, 500));
    } else{
        Data = {
            status: 'success',
            message: 'User data fetched sucessfully',
            userData: Data,
        };
    }
    if (!Data.userData) {
        req.status = 404;
        Data = {
            status: 'failed',
            message: 'No such user',
        };
    } else
        req.status = 200;
    return Data;
};

exports.signUp = async (req, res, next) => {
    const userInfo = {
        userName: req.body.userName.toLowerCase().trim(),
        fullName: req.body.fullName.trim(),
        eMail: req.body.eMail.trim(),
        password: req.body.password.trim(),
        passChanged: Math.floor(Date.now() / 1000),
        passChangedFlag: true,
    };
    await User.create(userInfo);
    const token = authController.getToken({ userName: userInfo.userName });
    const Data = {
        status: 'success',
        message: 'Sign Up completed successfully!',
        userName: userInfo.userName,
        fullName: userInfo.fullName,
        eMail: userInfo.eMail,
        token,
    };
    req.status = 201;
    return Data;
};

exports.updateUser = async (req, res, next) => {
    let token;
    const userInfo = req.body;
    if (req.body.password) {
        userInfo.passChanged = Math.floor(Date.now() / 1000);
        token = authController.getToken({ userName: req.payload.userName });
        userInfo.passChangedFlag = true;
    } else{
        userInfo.passChangedFlag = false;
    }
    await User.update(userInfo, {
        where: {
            userName: req.payload.userName,
        },
    });
    const Data = {
        status: 'success',
        message: 'User information updated Successfully',
        userName: req.payload.userName,
        token,
    };
    req.status = 200;
    return Data;
};

exports.deleteUser = async (req, res, next) => {
    await User.destroy({
        where: {
            userName: req.payload.userName,
        },
    });
    const Data = {
        status: 'success',
        message: 'User deleted Successfully',
    };
    req.status = 200;
    return Data;
};

/// For all the users///
// exports.deleteAllUsers = catchAsync(async (req, res, next) => {
//     await User.destroy({
//         truncate: true,
//     }).then(() => {
//         const Data = {
//             status: 'success',
//             message: 'All user deleted Successfully',
//         };
//         negotiate.negotiateData(Data, req, res, next);
//     });
// });

exports.getAllUsers = async (req, res, next) => {
    let Data;
    Data = await User.findAll({
        attributes: { exclude: ['password', 'createdAt', 'updatedAt', 'passChanged', 'passChangedFlag'] },
    });
    if(!Data){
        req.status = 500;
        return next(new AppError("Can't serve the data you wanted", 500));
    } else {
        Data = {
            status: 'success',
            message: 'User data fetched sucessfully',
            count: Data.length,
            userData: Data,
        };
    }
    if (Data.count === 0) {
        req.status = 200;
        Data.message ='There are no user';
    } else
        req.status = 200;
    return Data;
};
