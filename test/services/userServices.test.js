const { mockRequest, mockResponse } = require('jest-mock-req-res');
const services = require('../../services/userServices');
const controller = require('../../controllers/authController');
const User = require('../../models/usersModel');

const mockCreateUsers = {
    userName: 'tanimahossain',
    fullName: 'Tanima Hossain',
    eMail: 'tanima@gmail.com',
    password: 'tanima12',
};
const mockUsersResponse = [
    {
        userName: 'tanimahossain',
        fullName: 'Tanima Hossain',
        eMail: 'tanima@gmail.com',
    },
    {
        userName: 'tanimhossain',
        fullName: 'Tanima Hossain',
        eMail: 'tanim@gmail.com',
    },
];
const mockUserResponse = {
    userName: 'tanimahossain',
    fullName: 'Tanima Hossain',
    eMail: 'tanima@gmail.com',
    passChangedFlag: false,
};
describe('User SignUP', () => {
    test('create all okay', async () => {
        jest.restoreAllMocks();
        const mockReq = mockRequest({ body: mockCreateUsers });
        const mockRes = mockResponse();
        const mockNext = jest.fn();
        jest.spyOn(controller, 'getToken').mockReturnValue('This is a token');
        jest.spyOn(User, 'create').mockReturnValue();
        const Data = await services.signUp(mockReq, mockRes, mockNext);
        expect(mockReq.status).toBe(201);
        expect(Data.status).toBe('success');
        expect(Data.message).toBe('Sign Up completed successfully!');
        expect(Data.userName).toBe('tanimahossain');
        expect(Data.fullName).toBe('Tanima Hossain');
        expect(Data.eMail).toBe('tanima@gmail.com');
        expect(Data.token).toBe('This is a token');
    });
});
describe('View A User', () => {
    test('view perfectly fine', async () => {
        jest.clearAllMocks();
        const mockReq = mockRequest({
            params: {
                id: 'tanimahossain',
            },
        });
        const mockRes = mockResponse();
        const mockNext = jest.fn();
        jest.spyOn(User, 'findOne').mockReturnValue(mockUserResponse);
        const Data = await services.getUser(mockReq, mockRes, mockNext);
        expect(User.findOne).toHaveBeenCalledWith({
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt', 'passChanged', 'passChangedFlag'],
            },
            where: {
                userName: mockReq.params.id.trim(),
            },
        });
        expect(User.findOne).toHaveBeenCalledTimes(1);
        expect(mockReq.status).toBe(200);
        expect(Data.status).toBe('success');
        expect(Data.message).toBe('User data fetched sucessfully');
        expect(Data.userData).toBe(mockUserResponse);
    });
    test('view if1', async () => {
        jest.clearAllMocks();
        const mockReq = mockRequest({
            params: {
                id: 'tanimahossain',
            },
        });
        const mockRes = mockResponse();
        const mockNext = jest.fn();
        jest.spyOn(User, 'findOne').mockReturnValue();
        const Data = await services.getUser(mockReq, mockRes, mockNext);
        expect(User.findOne).toHaveBeenCalledWith({
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt', 'passChanged', 'passChangedFlag'],
            },
            where: {
                userName: mockReq.params.id.trim(),
            },
        });
        expect(User.findOne).toHaveBeenCalledTimes(1);
        expect(mockNext).toHaveBeenCalledTimes(1);
        expect(Data).toBeUndefined();
    });
    test('view if2', async () => {
        jest.clearAllMocks();
        const mockReq = mockRequest({
            params: {
                id: 'tanimahossain',
            },
        });
        const mockRes = mockResponse();
        const mockNext = jest.fn();
        jest.spyOn(User, 'findOne').mockReturnValue(null);
        const Data = await services.getUser(mockReq, mockRes, mockNext);
        expect(User.findOne).toHaveBeenCalledWith({
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt', 'passChanged', 'passChangedFlag'],
            },
            where: {
                userName: mockReq.params.id.trim(),
            },
        });
        expect(User.findOne).toHaveBeenCalledTimes(1);
        expect(mockReq.status).toBe(404);
        expect(Data.status).toBe('failed');
        expect(Data.message).toBe('No such user');
        expect(Data.userData).toBeUndefined();
    });
});
describe('View all Stories', () => {
    test('view all perfectly fine', async () => {
        jest.clearAllMocks();
        const mockReq = mockRequest();
        const mockRes = mockResponse();
        const mockNext = jest.fn();
        jest.spyOn(User, 'findAll').mockReturnValue(mockUsersResponse);
        const Data = await services.getAllUsers(mockReq, mockRes, mockNext);
        expect(User.findAll).toHaveBeenCalledWith({
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt', 'passChanged', 'passChangedFlag'],
            },
        });
        expect(User.findAll).toHaveBeenCalledTimes(1);
        expect(mockReq.status).toBe(200);
        expect(Data.status).toBe('success');
        expect(Data.message).toBe('User data fetched sucessfully');
        expect(Data.count).toBe(2);
        expect(Data.userData).toBe(mockUsersResponse);
    });

    test('view all no user available', async () => {
        jest.clearAllMocks();
        const mockReq = mockRequest();
        const mockRes = mockResponse();
        const mockNext = jest.fn();
        jest.spyOn(User, 'findAll').mockReturnValue([]);
        const Data = await services.getAllUsers(mockReq, mockRes, mockNext);
        expect(User.findAll).toHaveBeenCalledWith({
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt', 'passChanged', 'passChangedFlag'],
            },
        });
        expect(User.findAll).toHaveBeenCalledTimes(1);
        expect(mockReq.status).toBe(200);
        expect(Data.status).toBe('success');
        expect(Data.message).toBe('There are no user');
        expect(Data.count).toBe(0);
        expect(Data.userData).toStrictEqual([]);
    });

    test('view all sever error', async () => {
        jest.clearAllMocks();
        const mockReq = mockRequest();
        const mockRes = mockResponse();
        const mockNext = jest.fn();
        jest.spyOn(User, 'findAll').mockReturnValue();
        const Data = await services.getAllUsers(mockReq, mockRes, mockNext);
        expect(User.findAll).toHaveBeenCalledWith({
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt', 'passChanged', 'passChangedFlag'],
            },
        });
        expect(User.findAll).toHaveBeenCalledTimes(1);
        expect(mockReq.status).toBe(500);
        expect(mockNext).toHaveBeenCalledTimes(1);
        expect(Data).toBeUndefined();
    });
});
describe('Delete User', () => {
    test('Delete', async () => {
        jest.clearAllMocks();
        const mockReq = mockRequest({
            payload: {
                userName: 'tanimahossain',
                iat: '165788795687',
                exp: '165789795687',
            },
        });
        const mockRes = mockResponse();
        const mockNext = jest.fn();
        jest.spyOn(User, 'destroy').mockReturnValue();
        const Data = await services.deleteUser(mockReq, mockRes, mockNext);
        expect(User.destroy).toHaveBeenCalledWith({
            where: {
                userName: mockReq.payload.userName,
            },
        });
        expect(User.destroy).toHaveBeenCalledTimes(1);
        expect(mockReq.status).toBe(200);
        expect(Data.status).toBe('success');
        expect(Data.message).toBe('User deleted Successfully');
    });
});
describe('Update User', () => {
    test('update with no password', async () => {
        jest.clearAllMocks();
        const mockReq = mockRequest({
            body: {
                fullName: 'Tanima Hossain',
            },
            payload: {
                userName: 'tanimahossain',
            },
        });
        const mockRes = mockResponse();
        const mockNext = jest.fn();
        const userInfo = mockReq.body;
        userInfo.passChangedFlag = false;
        jest.spyOn(User, 'update').mockImplementation((val) => {
            return;
        });
        jest.spyOn(controller, 'getToken').mockReturnValue('ThisIsAToken');
        jest.spyOn(User, 'update').mockReturnValue();
        const Data = await services.updateUser(mockReq, mockRes, mockNext);
        expect(User.update).toHaveBeenCalledWith(userInfo, {
            where: {
                userName: mockReq.payload.userName,
            },
        });
        expect(User.update).toHaveBeenCalledTimes(1);
        expect(Data.status).toBe('success');
        expect(Data.message).toBe('User information updated Successfully');
        expect(Data.userName).toBe('tanimahossain');
        expect(Data.token).toBeUndefined();
        expect(userInfo.passChangedFlag).toBe(false);
    });
    test('update with all ifs', async () => {
        jest.restoreAllMocks();
        const mockReq = mockRequest({
            body: {
                fullName: 'Tanima Hossain',
                password: 'tanima12',
            },
            payload: {
                userName: 'tanimahossain',
            },
        });
        const mockRes = mockResponse();
        const mockNext = jest.fn();
        const userInfo = mockReq.body;
        jest.spyOn(controller, 'getToken').mockReturnValue('ThisIsAToken');
        jest.spyOn(User, 'update').mockReturnValue();
        const Data = await services.updateUser(mockReq, mockRes, mockNext);
        expect(User.update).toHaveBeenCalledWith(userInfo, {
            where: {
                userName: mockReq.payload.userName,
            },
        });
        expect(User.update).toHaveBeenCalledTimes(1);
        expect(mockReq.status).toBe(200);
        expect(Data.status).toBe('success');
        expect(Data.message).toBe('User information updated Successfully');
        expect(Data.userName).toBe('tanimahossain');
        expect(Data.token).toBe('ThisIsAToken');
        expect(userInfo.passChangedFlag).toBe(true);
    });
});
