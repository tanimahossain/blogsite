
///***For all Stories***///
exports.getAllStories = (req,res) => {
    res.status(200).send("get req in all Stories");
};

//not for user end
exports.postAllStories = (req,res) => {
    res.status(200).send("post req in all Stories");
};

exports.deleteAllStories = (req,res) => {
    res.status(200).send("delete req in all Stories");
};
///***For all Stories***///

///***For a single Story***///
exports.getStory = (req,res) => {
    res.status(200).send("get req in Stories");
};

exports.postStory = (req,res) => {
    const d = new Date();
    req.body.time = d.toUTCString;
    res.status(200).send("post req in Stories");
};

exports.updateStory = (req,res) => {
    res.status(200).send("update req in Stories");
};

exports.deleteStory = (req,res) => {
    res.status(200).send("delete req in Stories");
};
///***For a single Story***///