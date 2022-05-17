const err = require('../../controllers/errorController');
const { mockRequest, mockResponse } = require('jest-mock-req-res');
const error1 = {
    message: 'Validation error sfeaswer',
    status: 'failed',
};
const error2 = {
    statusCode: 404,
    message: '',
};
const error3 = {
    message: 'ftjdyr error sfeaswer',
};
describe('error Controller', () => {
    test('if1', async () => {
        jest.clearAllMocks();
        const mockReq = mockRequest();
        const mockRes = mockResponse();
        const mockNext = jest.fn();
        err(error1, mockReq, mockRes, mockNext);
        expect(mockNext).toHaveBeenCalledTimes(1);
    });
    test('if2', async () => {
        jest.clearAllMocks();
        const mockReq = mockRequest();
        const mockRes = mockResponse();
        const mockNext = jest.fn();
        err(error2, mockReq, mockRes, mockNext);
        expect(mockNext).toHaveBeenCalledTimes(1);
    });
    test('if3', async () => {
        jest.clearAllMocks();
        const mockReq = mockRequest();
        const mockRes = mockResponse();
        const mockNext = jest.fn();
        err(error3, mockReq, mockRes, mockNext);
        expect(mockNext).toHaveBeenCalledTimes(1);
    });
});
