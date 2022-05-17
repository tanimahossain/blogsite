const controller = require('../../controllers/userController');
const { mockRequest, mockResponse } = require('jest-mock-req-res');
const userServices = require('../../services/userServices');
const negotiate = require('../../utilities/contentNegotiation');

const mockCreateUser = {
    userName: 'tanimahossain',
    fullName: 'Tanima Hossain',
    eMail: 'tanima@gmail.com',
    password: 'asksdfejf',
};
const mockCreateUserRespose = {
    status: 'success',
    message: 'Sign Up completed successfully!',
    userName: 'tanimahossain',
    fullName: 'Tanima Hossain',
    eMail: 'tanima@gmail.com',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InRhbmltYWhvc3NhaW4iLCJpYXQiOjE2NTIxNzUzNDAsImV4cCI6MTY1OTk1MTM0MH0.7b0l7nnuQMSlVSjDYV9Lt2oeLnsAiqVJ2oFwJMAPvf4',
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
};
const mockUpdateUserResponse = {
    status: 'success',
    message: 'User updated Successfully',
    userName: 'tanimahossain',
    token: 'srkjhg9q4785q0vn93-02une4ytc5024',
};
describe('Sign Up', () => {
    test('sign up all okay', async () => {
        jest.clearAllMocks();
        const mockReq = mockRequest({ body: mockCreateUser });
        const mockRes = mockResponse();
        const mockNext = jest.fn();
        mockReq.payload = 'username';
        mockReq.payload.userName = 'tanimahossain';
        mockReq.status = 201;
        jest.spyOn(userServices, 'signUp').mockReturnValue(mockCreateUserRespose);
        jest.spyOn(negotiate, 'negotiateData').mockReturnValue(true);
        controller.signUp(mockReq, mockRes, mockNext);
        await Promise.resolve();
        expect(mockReq.status).toBe(201);
        expect(userServices.signUp).toHaveBeenCalledWith(mockReq, mockRes, mockNext);
        expect(negotiate.negotiateData).toHaveBeenCalledWith(
            mockCreateUserRespose,
            mockReq,
            mockRes,
            mockNext
        );
        expect(userServices.signUp).toHaveBeenCalledTimes(1);
        expect(negotiate.negotiateData).toHaveBeenCalledTimes(1);
    });
});
describe('User Update', () => {
    test('Update all okay', async () => {
        jest.clearAllMocks();
        const mockReq = mockRequest({
            fullName: 'OKAY',
            password: 'tanima12',
        });
        const mockRes = mockResponse();
        const mockNext = jest.fn();
        mockReq.payload = 'username';
        mockReq.payload.userName = 'tanimahossain';
        mockReq.status = 200;
        jest.spyOn(userServices, 'updateUser').mockReturnValue(mockUpdateUserResponse);
        jest.spyOn(negotiate, 'negotiateData').mockReturnValue(true);
        controller.updateUser(mockReq, mockRes, mockNext);
        await Promise.resolve();
        expect(mockReq.status).toBe(200);
        expect(userServices.updateUser).toHaveBeenCalledWith(mockReq, mockRes, mockNext);
        expect(negotiate.negotiateData).toHaveBeenCalledWith(
            mockUpdateUserResponse,
            mockReq,
            mockRes,
            mockNext
        );
        expect(userServices.updateUser).toHaveBeenCalledTimes(1);
        expect(negotiate.negotiateData).toHaveBeenCalledTimes(1);
    });
});
describe('User Delete', () => {
    test('Delete all okay', async () => {
        jest.clearAllMocks();
        const mockReq = mockRequest({
            payload: {
                userName: 'tanimahossain',
            },
        });
        const mockRes = mockResponse();
        const mockNext = jest.fn();
        mockReq.status = 200;

        jest.spyOn(userServices, 'deleteUser').mockReturnValue({
            status: 'success',
            message: 'User deleted Successfully',
        });
        jest.spyOn(negotiate, 'negotiateData').mockReturnValue(true);

        controller.deleteUser(mockReq, mockRes, mockNext);
        await Promise.resolve();
        expect(mockReq.status).toBe(200);
        expect(userServices.deleteUser).toHaveBeenCalledWith(mockReq, mockRes, mockNext);
        expect(negotiate.negotiateData).toHaveBeenCalledWith(
            {
                status: 'success',
                message: 'User deleted Successfully',
            },
            mockReq,
            mockRes,
            mockNext
        );
        expect(userServices.deleteUser).toHaveBeenCalledTimes(1);
        expect(negotiate.negotiateData).toHaveBeenCalledTimes(1);
    });
});
describe('User View', () => {
    test('view a user all okay', async () => {
        jest.clearAllMocks();
        const mockReq = mockRequest({
            params: {
                id: 'tanimahossain',
            },
        });
        const mockRes = mockResponse();
        const mockNext = jest.fn();
        mockReq.status = 200;

        jest.spyOn(userServices, 'getUser').mockReturnValue({
            status: 'success',
            message: 'User data fetched sucessfully',
            userData: mockUserResponse,
        });
        jest.spyOn(negotiate, 'negotiateData').mockReturnValue(true);

        controller.getUser(mockReq, mockRes, mockNext);
        await Promise.resolve();
        expect(mockReq.status).toBe(200);
        expect(userServices.getUser).toHaveBeenCalledWith(mockReq, mockRes, mockNext);
        expect(negotiate.negotiateData).toHaveBeenCalledWith(
            {
                status: 'success',
                message: 'User data fetched sucessfully',
                userData: mockUserResponse,
            },
            mockReq,
            mockRes,
            mockNext
        );
        expect(userServices.getUser).toHaveBeenCalledTimes(1);
        expect(negotiate.negotiateData).toHaveBeenCalledTimes(1);
    });
});
describe('Users View', () => {
    test('view all Users all okay', async () => {
        jest.clearAllMocks();
        const mockReq = mockRequest();
        const mockRes = mockResponse();
        const mockNext = jest.fn();
        mockReq.status = 200;
        mockReq.params.id = 'tanimahossain_1';

        jest.spyOn(userServices, 'getAllUsers').mockReturnValue({
            status: 'success',
            message: 'User data fetched sucessfully',
            count: 2,
            storyData: mockUsersResponse,
        });
        jest.spyOn(negotiate, 'negotiateData').mockReturnValue();

        controller.getAllUsers(mockReq, mockRes, mockNext);
        await Promise.resolve();
        expect(mockReq.status).toBe(200);
        expect(userServices.getAllUsers).toHaveBeenCalledWith(mockReq, mockRes, mockNext);
        expect(negotiate.negotiateData).toHaveBeenCalledWith(
            {
                status: 'success',
                message: 'User data fetched sucessfully',
                count: 2,
                storyData: mockUsersResponse,
            },
            mockReq,
            mockRes,
            mockNext
        );
        expect(userServices.getAllUsers).toHaveBeenCalledTimes(1);
        expect(negotiate.negotiateData).toHaveBeenCalledTimes(1);
    });
});
