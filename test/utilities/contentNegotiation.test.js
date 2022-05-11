const { mockRequest, mockResponse } = require('jest-mock-req-res');
const negotiate = require('../../utilities/contentNegotiation');
const content = {
    name: "tanima",
    addess: "shangkar, dhanmondi"
}
const successContent = {
    status: 'success'
}
describe('Content Negotiation', () => {
    test('For Html', async () => {
        jest.clearAllMocks()
        const mockReq = mockRequest({ 
            headers: {'accept':'text/html, application/xml'},
            status: 200
        });
        const mockRes = mockResponse();
        const mockNext = jest.fn();
        const response = await negotiate.negotiateData(content, mockReq, mockRes, mockNext);
        await Promise.resolve();
        expect(mockReq.status).toBe(200);
        expect(response).toBeTruthy();
    });
    test('unavailable format', async () => {
        jest.clearAllMocks()
        const mockReq = mockRequest({ 
            headers: {'accept':'application/xml'},
            status: 500
        });
        const mockRes = mockResponse();
        const mockNext = jest.fn();
        await negotiate.negotiateData({
            status: 'error'
        }, mockReq, mockRes, mockNext);
        await Promise.resolve();
        expect(mockReq.status).toBe(406);
        expect(mockNext).toHaveBeenCalledTimes(1);
    });
    test('missing format', async () => {
        jest.clearAllMocks()
        const mockReq = mockRequest({ 
            headers: {'accept':'*/*'},
            status: 404
        });
        const mockRes = mockResponse();
        const mockNext = jest.fn();
        const response = await negotiate.negotiateData(successContent, mockReq, mockRes, mockNext);
        await Promise.resolve();
        expect(mockReq.status).toBe(404);
        expect(response).toBeTruthy();
    });
    test('json format', async () => {
        jest.clearAllMocks()
        const mockReq = mockRequest({ 
            headers: {'accept':'application/json'}
        });
        const mockRes = mockResponse();
        const mockNext = jest.fn();
        const response = await negotiate.negotiateData(content, mockReq, mockRes, mockNext);
        await Promise.resolve();
        expect(mockReq.status).toBe(200);
        expect(response).toBeTruthy();
    });
});