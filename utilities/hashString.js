// dependencies
const crypto = require('crypto');
const environments = require('../helpers/environments');
// module scruffolding
const hashString = {};
// hash string

hashString.makeHash = (str) => {
    const hash = crypto.createHmac('sha256', environments.secretKey).update(str).digest('hex');
    return hash;
};
hashString.checkHash = (hashedStr, str) => {
    const hash = hashString.makeHash(str);
    if (hash === hashedStr) return true;
    return false;
};
module.exports = hashString;
