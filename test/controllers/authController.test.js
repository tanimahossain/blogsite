//const controller = require('../../controllers/userController');
const { mockRequest, mockResponse } = require('jest-mock-req-res');
//const userServices = require('../../services/userServices');
//const negotiate = require('../../utilities/contentNegotiation');
const controller = require('../../controllers/authController');
const jwt = require('jsonwebtoken');
const User = require('../../models/usersModel');
const hashString = require('../../utilities/hashString');
// const mockCreateUser = {
//     userName: "tanimahossain",
//     fullName: "Tanima Hossain",
//     eMail: "tanima@gmail.com",
//     password: "asksdfejf",
// };
// const mockCreateUserRespose = {
//     status: "success",
//     message: "Sign Up completed successfully!",
//     userName: "tanimahossain",
//     fullName: "Tanima Hossain",
//     eMail: "tanima@gmail.com",
//     token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InRhbmltYWhvc3NhaW4iLCJpYXQiOjE2NTIxNzUzNDAsImV4cCI6MTY1OTk1MTM0MH0.7b0l7nnuQMSlVSjDYV9Lt2oeLnsAiqVJ2oFwJMAPvf4"
// }
// const mockUsersResponse = [
//     {
//         "userName": "tanimahossain",
//         "fullName": "Tanima Hossain",
//         "eMail": "tanima@gmail.com"
//     },
//     {
//         "userName": "tanimhossain",
//         "fullName": "Tanima Hossain",
//         "eMail": "tanim@gmail.com"
//     }
// ];
// const mockUserResponse = {
//     "userName": "tanimahossain",
//     "fullName": "Tanima Hossain",
//     "eMail": "tanima@gmail.com"
// };
// const mockUpdateUserResponse = {
//     status: 'success',
//     message: 'User updated Successfully',
//     userName: 'tanimahossain',
//     token: "srkjhg9q4785q0vn93-02une4ytc5024",
// };
describe('Get token', () => {
    test('Get Token', async () => {
        jest.clearAllMocks();
        jest.spyOn(jwt, 'sign').mockReturnValue('kisueryhfoiauyt');
        const Data = controller.getToken({
            userName: 'tanimahossain',
        });
        expect(Data).toBeTruthy();
        expect(jwt.sign).toHaveBeenCalledTimes(1);
    });
});
describe('Token parsing', () => {
    test('Valid token parse', async () => {
        jwt.sign.mockRestore();
        jest.clearAllMocks();
        const token = controller.getToken({ userName: 'tanimahossain' });
        const mockReq = mockRequest({
            headers: {
                authorization: `Bearer ${token}`,
            },
        });
        const mockRes = mockResponse();
        const mockNext = jest.fn();
        const payload = await controller.parseToken(mockReq, mockRes, mockNext);
        await Promise.resolve();
        expect(payload).toBeTruthy();
        expect(typeof payload).toBe('object');
        expect(Object.keys(payload)).toStrictEqual(['userName', 'iat', 'exp']);
    });
    test('invalid token parse', async () => {
        jest.clearAllMocks();
        const token = 'sdefawert';
        const mockReq = mockRequest({
            headers: {
                authorization: `${token}`,
            },
        });
        const mockRes = mockResponse();
        const mockNext = jest.fn();
        const payload = await controller.parseToken(mockReq, mockRes, mockNext);
        await Promise.resolve();
        expect(payload).toBeFalsy();
        expect(mockNext).toHaveBeenCalledTimes(1);
    });
    test('empty username token parsing', async () => {
        jest.clearAllMocks();
        const token = 'sdefawert';
        const mockReq = mockRequest({
            headers: {
                authorization: `Bearer ${token}`,
            },
        });
        const mockRes = mockResponse();
        const mockNext = jest.fn();
        const payload = await controller.parseToken(mockReq, mockRes, mockNext);
        await Promise.resolve();
        expect(payload).toBeFalsy();
        expect(mockNext).toHaveBeenCalledTimes(1);
    });
    test('Valid token parse', async () => {
        jest.clearAllMocks();
        const token = controller.getToken({});
        const mockReq = mockRequest({
            headers: {
                authorization: `Bearer ${token}`,
            },
        });
        const mockRes = mockResponse();
        const mockNext = jest.fn();
        const payload = await controller.parseToken(mockReq, mockRes, mockNext);
        await Promise.resolve();
        expect(payload).toBeFalsy();
        expect(mockNext).toHaveBeenCalledTimes(1);
    });
});
describe('Authorization', () => {
    test('Valid authorization', async () => {
        jest.restoreAllMocks();
        const token = controller.getToken({ userName: 'tanimahossain' });
        const mockReq = mockRequest({
            headers: {
                authorization: `Bearer ${token}`,
            },
        });
        const mockRes = mockResponse();
        const mockNext = jest.fn();
        const payload = await controller.parseToken(mockReq, mockRes, mockNext);
        jest.spyOn(User, 'findOne').mockReturnValue({
            userName: payload.userName,
            fullName: 'Tanima Hossain',
            eMail: 'tanima@gmail.com',
            passChanged: payload.iat,
        });
        await controller.authorize(mockReq, mockRes, mockNext);
        await Promise.resolve();
        expect(controller.authorize).toBeTruthy();
    });
    test('user not found authorization', async () => {
        jest.restoreAllMocks();
        const token = controller.getToken({ userName: 'tanimahossain' });
        const mockReq = mockRequest({
            headers: {
                authorization: `Bearer ${token}`,
            },
        });
        const mockRes = mockResponse();
        const mockNext = jest.fn();
        jest.spyOn(User, 'findOne').mockReturnValue();
        await controller.authorize(mockReq, mockRes, mockNext);
        await Promise.resolve();
        expect(controller.authorize).toBeTruthy();
    });
    test('payload username found authorization', async () => {
        jest.restoreAllMocks();
        const token = controller.getToken({ userName: null });
        const mockReq = mockRequest({
            headers: {
                authorization: `Bearer ${token}`,
            },
        });
        const mockRes = mockResponse();
        const mockNext = jest.fn();
        await controller.authorize(mockReq, mockRes, mockNext);
        await Promise.resolve();
        expect(controller.authorize).toBeTruthy();
    });
    test('password over authorization', async () => {
        jest.restoreAllMocks();
        const token = controller.getToken({ userName: 'tanimahossain' });
        const mockReq = mockRequest({
            headers: {
                authorization: `Bearer ${token}`,
            },
        });
        const mockRes = mockResponse();
        const mockNext = jest.fn();
        const payload = await controller.parseToken(mockReq, mockRes, mockNext);
        jest.spyOn(User, 'findOne').mockReturnValue({
            userName: payload.userName,
            fullName: 'Tanima Hossain',
            eMail: 'tanima@gmail.com',
            passChanged: 5 + payload.iat,
        });
        await controller.authorize(mockReq, mockRes, mockNext);
        await Promise.resolve();
        expect(controller.authorize).toBeTruthy();
    });
});
describe('Log In User', () => {
    test('logIn all okay', async () => {
        jest.restoreAllMocks();
        const mockReq = mockRequest({
            body: {
                userName: 'tanimahossain',
                password: 'tanima12',
            },
        });
        const mockRes = mockResponse();
        const mockNext = jest.fn();
        jest.spyOn(controller, 'getToken').mockReturnValue('this is a token');
        jest.spyOn(User, 'findOne').mockReturnValue({
            userName: 'tanimahossain',
            password: 'tanima12',
        });
        jest.spyOn(hashString, 'checkHash').mockImplementation(async (str1, str2) => {
            return str1 === str2;
        });
        await controller.logIn(mockReq, mockRes, mockNext);
        await Promise.resolve();
        expect(controller.logIn).toBeTruthy();
        expect(mockReq.status).toBe(200);
    });
    test('logIn if1', async () => {
        jest.restoreAllMocks();
        const mockReq = mockRequest();
        const mockRes = mockResponse();
        const mockNext = jest.fn();
        jest.spyOn(controller, 'getToken').mockReturnValue('this is a token');
        jest.spyOn(User, 'findOne').mockReturnValue({
            userName: 'tanimahossain',
            password: 'tanima12',
        });
        jest.spyOn(hashString, 'checkHash').mockImplementation(async (str1, str2) => {
            return str1 === str2;
        });
        await controller.logIn(mockReq, mockRes, mockNext);
        await Promise.resolve();
        expect(controller.logIn).toBeTruthy();
        expect(mockReq.status).toBe(400);
    });
    test('logIn if2', async () => {
        jest.restoreAllMocks();
        const mockReq = mockRequest({
            body: {
                userName: 'tanimahossain',
                password: 'tanima12',
            },
        });
        const mockRes = mockResponse();
        const mockNext = jest.fn();
        jest.spyOn(controller, 'getToken').mockReturnValue('this is a token');
        jest.spyOn(User, 'findOne').mockReturnValue();
        jest.spyOn(hashString, 'checkHash').mockImplementation(async (str1, str2) => {
            return str1 === str2;
        });
        await controller.logIn(mockReq, mockRes, mockNext);
        await Promise.resolve();
        expect(controller.logIn).toBeTruthy();
        expect(mockReq.status).toBe(401);
    });
    test('logIn if3', async () => {
        jest.restoreAllMocks();
        const mockReq = mockRequest({
            body: {
                userName: 'tanimahossain',
                password: 'tanima12',
            },
        });
        const mockRes = mockResponse();
        const mockNext = jest.fn();
        jest.spyOn(controller, 'getToken').mockReturnValue('this is a token');
        jest.spyOn(User, 'findOne').mockReturnValue({
            userName: 'tanimahossain',
            password: 'tanima13',
        });
        jest.spyOn(hashString, 'checkHash').mockImplementation(async (str1, str2) => {
            return str1 === str2;
        });
        await controller.logIn(mockReq, mockRes, mockNext);
        await Promise.resolve();
        expect(controller.logIn).toBeTruthy();
        expect(mockReq.status).toBe(401);
    });
});

describe('Verify', () => {
    test('verify', async () => {
        jest.restoreAllMocks();
        const mockReq = mockRequest({
            headers: {
                authorization: 'Bearer MyToken',
            },
            payload: {
                userName: 'tanimahossain',
            },
        });
        const mockRes = mockResponse();
        const mockNext = jest.fn();
        await controller.verify(mockReq, mockRes, mockNext);
        await Promise.resolve();
        expect(controller.verify).toBeTruthy();
        expect(mockReq.status).toBe(200);
    });
});
