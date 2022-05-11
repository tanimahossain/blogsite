
test('environments default set up', () => {
    const environments = require('../../helpers/environments');
    expect(environments.port).toBe(3000);
    expect(environments.envName).toBe('staging');
    expect(environments.secretKey).toBe('tanima');
    expect(environments.jwtSecretKey).toBe('blogsite-by-tanima-hossain-staging');
    expect(environments.jwtExpire).toBe('90d');
});
