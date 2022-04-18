///dependencies///
const User = require('./../models/usersModel.js');
const hashString = require('./../utilities/hashString.js');
const authController = require('./../controllers/authController.js');
///dependencies///

/// For a single user///
exports.getUser = async(req,res) => {
    await User.findAll({
        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
        where: {
            userName: req.params.id
        }
    })
    .then( (userData) => {
        const Data = {
            status: 'User data fetched sucessfully',
            userData
        }
        res.status(200).send(Data);
    })
    .catch( (err) => {
        res.status(200).send('User did was not found '+ err);
    })
}

exports.signUp = async(req,res) => {
    let userInfo = {
        userName: req.body.userName,
        fullName: req.body.fullName,
        eMail: req.body.eMail,
        password: hashString.makeHash(req.body.password),
        passChanged: Math.floor(Date.now()/1000)
    }
    await User.create(userInfo)
    .then( () => {
        const token = authController.getToken({userName: userInfo.userName});
        res.status(200).json({
            status: 'Sign Up completed successfully!',
            token,
            data: {
                userName: userInfo.userName,
                fullName: userInfo.fullName,
                eMail: userInfo.eMail
            }
        });
    })
    .catch( (err) => {
        res.status(200).send('Could not create user '+ err);
    })
}

exports.logIn = async(req,res) => {
    ///
}

exports.updateUser = async(req,res) => {
    console.log(req.body);
    const userInfo = req.body;
    let msg = {
        status: 'User updated Succesfully.'
    };
    if(req.body.password){
        userInfo.passChanged = Math.floor(Date.now()/1000);
        userInfo.password = hashString.makeHash(req.body.password);
        const token = authController.getToken({userName: userInfo.userName});
        msg = {
            status: 'User updated Succesfully.',
            token
        }
    }
    await User.update(userInfo,{
        where: {
            userName: req.params.id
        }
    })
    .then( () => {
        res.status(200).send(msg);
    })
    .catch( (err) => {
        res.status(500).send('Could not update user '+ err);
    })
}

exports.deleteUser = async(req,res) => {
    await User.destroy({
        where: {
            userName: req.params.id
        }
    })
    .then( () => {
        res.status(200).send('User deleted Succesfully.');
    })
    .catch( (err) => {
        res.status(200).send('Could not delete user '+ err);
    })
}
/// For a single user///

/// For all the users///
exports.deleteAllUsers = async(req,res) => {
    await User.destroy({
        truncate: true
    })
    .then( () => {
        res.status(200).send('All Users deleted Succesfully.');
    })
    .catch( (err) => {
        res.status(200).send('Could not delete user '+ err);
    })
}

exports.getAllUsers = async(req,res) => {
    console.log(req.body);
    await User.findAll({
        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
    })
    .then( (userData) => {
        const Data ={
            status: 'User data fetched sucessfully',
            userData
        }
        res.status(200).send(Data);
    })
    .catch( (err) => {
        res.status(200).send('Could not create user '+ err);
    })
}
/// For all the users///