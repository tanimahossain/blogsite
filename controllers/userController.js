/// Dependencies///
const negotiate = require('../utilities/contentNegotiation');
const userServices = require('../services/userServices');
const catchAsync = require('../utilities/catchAsync');
/// Dependencies///

/// For all Users///
exports.getAllUsers = catchAsync(async (req, res, next) => {
    const Data = await userServices.getAllUsers(req, res, next);
    await negotiate.negotiateData(Data, req, res, next);
});

// exports.deleteAllUsers = (req, res, next) => {
//     userServices.deleteAllUsers(req, res, next);
// };

/// For a single user///
exports.getUser = catchAsync(async (req, res, next) => {
    const Data = await userServices.getUser(req, res, next);
    await negotiate.negotiateData(Data, req, res, next);
});
exports.signUp = catchAsync(async (req, res, next) => {
    const Data = await userServices.signUp(req, res, next);
    await negotiate.negotiateData(Data, req, res, next);
});

exports.updateUser = catchAsync(async (req, res, next) => {
    const Data = await userServices.updateUser(req, res, next);
    await negotiate.negotiateData(Data, req, res, next);
});

exports.deleteUser = catchAsync(async (req, res, next) => {
    const Data = await userServices.deleteUser(req, res, next);
    await negotiate.negotiateData(Data, req, res, next);
});
