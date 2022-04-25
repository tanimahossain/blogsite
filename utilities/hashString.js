/// Dependencies ///
const bcrypt = require('bcryptjs');

const hashString = {};

hashString.makeHash = async (str) => {
    const hash = await bcrypt.hash(str, 12);
    console.log(hash, typeof hash);
    return hash;
};

hashString.checkHash = async (hashedStr, str) => {
    const flag = await bcrypt.compare(str, hashedStr);
    console.log('flag: ', flag);
    return flag;
};
module.exports = hashString;
