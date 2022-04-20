/// Dependencies///
const User = require('../models/usersModel');
const hashString = require('../utilities/hashString');
const authController = require('../controllers/authController');
/// Dependencies///

/// For a single user///
exports.getUser = async (req, res) => {
    await User.findAll({
        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
        where: {
            userName: req.params.id,
        },
    })
        .then((userData) => {
            const Data = {
                status: 'User data fetched sucessfully',
                userData,
            };
            res.status(200).send(Data);
        })
        .catch((err) => {
            res.status(200).send(`User did was not found ${err}`);
        });
};

exports.signUp = async (req, res) => {
    const hash = hashString.makeHash(req.body.password);
    console.log(hash, typeof hash);
    const userInfo = {
        userName: req.body.userName,
        fullName: req.body.fullName,
        eMail: req.body.eMail,
        password: (await hash).toString(),
        passChanged: Math.floor(Date.now() / 1000),
    };
    await User.create(userInfo)
        .then(() => {
            const token = authController.getToken({ userName: userInfo.userName });
            res.status(200).json({
                status: 'Sign Up completed successfully!',
                token,
                data: {
                    userName: userInfo.userName,
                    fullName: userInfo.fullName,
                    eMail: userInfo.eMail,
                },
            });
        })
        .catch((err) => {
            res.status(200).send(`Could not create user ${err}`);
        });
};

exports.updateUser = async (req, res) => {
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
    let payload;
    try {
        payload = await authController.parseToken(req, res);
    } catch (err) {
        res.status(400).send(`gkdjsyg ${err}`);
    }
    await User.update(userInfo, {
        where: {
            userName: payload.userName,
        },
    })
        .then(() => {
            res.status(200).send(msg);
        })
        .catch((err) => {
            res.status(500).send(`Could not update user ${err}`);
        });
};

exports.deleteUser = async (req, res) => {
    let payload;
    try {
        payload = await authController.parseToken(req, res);
    } catch (err) {
        res.status(400).send(`gkdjsyg ${err}`);
    }
    await User.destroy({
        where: {
            userName: payload.userName,
        },
    })
        .then(() => {
            res.status(200).send('User deleted Succesfully.');
        })
        .catch((err) => {
            res.status(200).send(`Could not delete user ${err}`);
        });
};

/// For all the users///
exports.deleteAllUsers = async (req, res) => {
    await User.destroy({
        truncate: true,
    })
        .then(() => {
            res.status(200).send('All Users deleted Succesfully.');
        })
        .catch((err) => {
            res.status(200).send(`Could not delete user ${err}`);
        });
};

exports.getAllUsers = async (req, res) => {
    console.log(req.body);
    await User.findAll({
        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
    })
        .then((userData) => {
            const Data = {
                status: 'User data fetched sucessfully',
                userData,
            };
            res.status(200).send(Data);
        })
        .catch((err) => {
            res.status(200).send(`Could not create user ${err}`);
        });
};
