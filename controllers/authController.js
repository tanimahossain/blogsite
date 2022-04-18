///decependencies///
const util = require('util');
const jwt = require('jsonwebtoken');
const jwtTokenErrorController = require('./jwtTokenErrorController.js');
const environments = require('./../helpers/environments');
const User = require('./../models/usersModel.js');
///dependencies///

exports.getToken = (userInfo) => {
    const token = jwt.sign(userInfo, environments.jwtSecretKey,{expiresIn: environments.jwtExpire});
    return token;
}
exports.getPayload = async(req, res, next) => {
    token = req.headers.authorization.split(' ')[1];
}
exports.authorize = async(req, res, next) => {
    let token;
    ///Existence of Token
        console.log('token coming');
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } else{
        return res.status(401).send('Please log in first!');
    }
    ///Verification of Token
    let payload;
    console.log('payload coming');
    try{
        payload = await jwt.verify(token, environments.jwtSecretKey);
    } catch(err){
        return res.status(401).send('Authorization error! Please log in first!');
    }
    if(!payload.userName){
        return res.status(401).send('Authorize! Please log in first!');
    }
    ///User Exists
    const userStillExists = await User.findOne({
        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
        where: {
            userName: payload.userName
        }
    });
    if(!userStillExists){
        return res.status(401).send('Authorize!! Please log in first!');
    }
    console.log(payload);
    ///If password changed after issuing this token
    if(userStillExists.passChanged>payload.iat){
        return res.status(401).send('looks like your password has changed! Please log in again!');
    }
    next();
}