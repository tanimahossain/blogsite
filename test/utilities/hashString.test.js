const hashString = require('../../utilities/hashString');
describe('String hash', () => {
    let response;
    test('Doing hash', async () => {
        response = await hashString.makeHash('tanima');
        await Promise.resolve();
        expect(typeof response).toBe('string');
        expect(response).toBeTruthy();
    });
    test('checking hash true', async () => {
        const flag = await hashString.checkHash(response, 'tanima');
        await Promise.resolve();
        expect(typeof flag).toBe('boolean');
        expect(flag).toBe(true);
    });
    test('checking hash false', async () => {
        const flag = await hashString.checkHash(response, 'tanina');
        await Promise.resolve();
        expect(typeof flag).toBe('boolean');
        expect(flag).toBe(false);
    });
});
