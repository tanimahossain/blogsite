/// Dependencies ///
const bcrypt = require('bcryptjs');

const hashString = {};

hashString.makeHash = async (str) => {
    // const hash = crypto.createHmac('sha256', environments.secretKey).update(str).digest('hex');
    const hash = await bcrypt.hash(str, 12);
    console.log(hash, typeof hash);
    return hash;
};
hashString.checkHash = async (hashedStr, str) => {
    let flag;
    await bcrypt
        .compare(str, hashedStr)
        .then((val) => {
            flag = val;
            console.log(`flag: ${flag}`);
            return flag;
        })
        .catch((err) => false);
};
module.exports = hashString;
