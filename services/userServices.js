
const User = require('./../models/usersModel.js');
const hashString = require('./../utilities/hashString.js');

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
        password: hashString.makeHash(req.body.password)
    }
    await User.create(userInfo)
    .then( () => {
        res.status(200).send('User Created Succesfully.');
    })
    .catch( (err) => {
        res.status(200).send('Could not create user '+ err);
    })
}

exports.updateUser = async(req,res) => {
    console.log(req.body);
    await User.update(req.body,{
        where: {
            userName: req.body.userName
        }
    })
    .then( () => {
        res.status(200).send('User updated Succesfully.');
    })
    .catch( (err) => {
        res.status(200).send('Could not update user '+ err);
    })
}

exports.deleteUser = async(req,res) => {
    await User.destroy({
        where: {
            userName: req.body.userName
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