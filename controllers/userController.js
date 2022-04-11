

///***For all Users***///
exports.getAllUsers = (req,res) => {
    console.log(req.body.abc);
    res.status(200).send("get req in all Users");
};

//not for user end
exports.postAllUsers = (req,res) => {
    res.status(200).send("post req in all Users");
};

exports.deleteAllUsers = (req,res) => {
    res.status(200).send("delete req in all Users");
};
///***For all users***///

///***For a single user***///
exports.getUser = (req,res) => {
    res.status(200).send("get req in Users");
};

exports.postUser = (req,res) => {
    res.status(200).send("post req in Users");
};

exports.updateUser = (req,res) => {
    res.status(200).send("update req in Users");
};

exports.deleteUser = (req,res) => {
    res.status(200).send("delete req in Users");
};
///***For a single user***///
