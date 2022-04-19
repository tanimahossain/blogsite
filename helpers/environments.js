const env = {};

env.staging = {
    port: 3000,
    envName: 'staging',
    secretKey: 'tanima',
    jwtSecretKey: 'blogsite-by-tanima-hossain-staging',
    jwtExpire: '90d',
};

env.production = {
    port: 5000,
    envName: 'production',
    secretKey: 'secretKey',
    jwtSecretKey: 'blogsite-by-tanima-hossain-production',
    jwtExpire: '30d',
};

const currenv = typeof process.env.NODE_ENV === 'string' ? process.env.NODE_ENV : 'staging';

// export corresponding environment object
const envToExport = typeof env[currenv] === 'object' ? env[currenv] : env.staging;

module.exports = envToExport;
