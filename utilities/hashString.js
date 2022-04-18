//dependencies
const crypto = require('crypto');
const environments = require('./../helpers/environments');
//module scruffolding
const hashString = {};
// hash string

hashString.makeHash = function(str){
    const hash = crypto
        .createHmac('sha256',environments.secretKey)
        .update(str)
        .digest('hex');
    return hash;
}
hashString.checkHash = function(hashedStr, str){
    const hash=this.makeHash(str);
    if( hash===hashedStr )
        return true;
    else
        return false;
};
module.exports = hashString;