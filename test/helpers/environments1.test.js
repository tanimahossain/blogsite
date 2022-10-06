test('environments default set up', () => {
    process.env.NODE_ENV = 'production';
    const environments = require('../../helpers/environments');
    expect(environments.port).toBe(5000);
    expect(environments.envName).toBe('production');
    expect(environments.secretKey).toBe('secretKey');
    expect(environments.jwtSecretKey).toBe('blogsite-by-tanima-hossain-production');
    expect(environments.jwtExpire).toBe('30d');
});
