const controller = require('../../controllers/storyController');
const { mockRequest, mockResponse } = require('jest-mock-req-res');
const storyServices = require('../../services/storyServices');
const negotiate = require('../../utilities/contentNegotiation');

const mockCreateStories = [
    {
        authorName: 'el.duivel',
        storyTitle: 'First Story',
        storyDescription: 'This is my first story.',
    }
];
const mockCreateStoryRespose = {
    status: 'success',
    message: 'Story Created Succesfully.',
    storyId: 'tanimahossain_1',
    authorName: 'el.duivel',
    storyTitle: 'First Story',
    openingLines: 'This is my first story....'
  }
const mockStoriesResponse = [
    {
        "storyId": "tanimahossain_1",
        "authorName": "el.duivel",
        "storyTitle": "tanima",
        "openingLines": "tanima wkjegriauwcyeoviuytiutynvoir ruqtoiuwytcvquiwe weoyurcvopuryt[pqweoicoirgytpuvnryqcp cvqopwnp...",
        "createdAt": "2022-05-09T08:24:26.000Z",
        "updatedAt": "2022-05-09T08:24:26.000Z",
        "authorUsername": "tanimahossain"
    },
    {
        "storyId": "tanimahossain_2",
        "authorName": "el.duivel",
        "storyTitle": "tanima",
        "openingLines": "tanima wkjegriauwcyeoviuytiutynvoir ruqtoiuwytcvquiwe weoyurcvopuryt[pqweoicoirgytpuvnryqcp cvqopwnp...",
        "createdAt": "2022-05-09T08:24:27.000Z",
        "updatedAt": "2022-05-09T08:24:27.000Z",
        "authorUsername": "tanimahossain"
    },
    {
        "storyId": "tanimahossain_3",
        "authorName": "el.duivel",
        "storyTitle": "tanima",
        "openingLines": "tanima wkjegriauwcyeoviuytiutynvoir ruqtoiuwytcvquiwe weoyurcvopuryt[pqweoicoirgytpuvnryqcp cvqopwnp...",
        "createdAt": "2022-05-09T08:24:28.000Z",
        "updatedAt": "2022-05-09T08:24:28.000Z",
        "authorUsername": "tanimahossain"
    },
    {
        "storyId": "tanimahossain_4",
        "authorName": "el.duivel",
        "storyTitle": "tanima",
        "openingLines": "tanima wkjegriauwcyeoviuytiutynvoir ruqtoiuwytcvquiwe weoyurcvopuryt[pqweoicoirgytpuvnryqcp cvqopwnp...",
        "createdAt": "2022-05-09T08:24:29.000Z",
        "updatedAt": "2022-05-09T08:24:29.000Z",
        "authorUsername": "tanimahossain"
    },
    {
        "storyId": "tanimahossain_5",
        "authorName": "el.duivel",
        "storyTitle": "tanima",
        "openingLines": "tanima wkjegriauwcyeoviuytiutynvoir ruqtoiuwytcvquiwe weoyurcvopuryt[pqweoicoirgytpuvnryqcp cvqopwnp...",
        "createdAt": "2022-05-09T08:24:29.000Z",
        "updatedAt": "2022-05-09T08:24:29.000Z",
        "authorUsername": "tanimahossain"
    }
];
const mockStoryResponse = {
    "storyId": "tanimahossain_2",
    "authorName": "el.duivel",
    "storyTitle": "tanima",
    "openingLines": "tanima wkjegriauwcyeoviuytiutynvoir ruqtoiuwytcvquiwe weoyurcvopuryt[pqweoicoirgytpuvnryqcp cvqopwnp...",
    "storyDescription": "tanima wkjegriauwcyeoviuytiutynvoir ruqtoiuwytcvquiwe weoyurcvopuryt[pqweoicoirgytpuvnryqcp cvqopwnpuorytqciiryvtqpoiccytunqpcvotu ovtupwyttuiymeoiurytnrt",
    "createdAt": "2022-05-09T09:02:16.000Z",
    "updatedAt": "2022-05-09T09:02:16.000Z",
    "authorUsername": "tanimahossain"
};
const mockUpdateStories = {
    authorName: ' el.duivel ',
    storyTitle: ' second Story ',
    storyDescription:
        'This is my second story for testing the story services. Let us check if this works for update. and has more than 100 characters',
};
describe('Story Create', () => {
    test('create all okay', async () => {
        jest.clearAllMocks()
        const mockReq = mockRequest({ body: mockCreateStories[0] });
        const mockRes = mockResponse();
        const mockNext = jest.fn();
        mockReq.payload='username';
        mockReq.payload.userName = 'tanimahossain';
        mockReq.status = 201;
        jest.spyOn(storyServices, 'postStory').mockReturnValue(mockCreateStoryRespose);
        jest.spyOn(negotiate, 'negotiateData').mockReturnValue(mockCreateStoryRespose);
        controller.postStory(mockReq, mockRes, mockNext);
        await Promise.resolve();
        expect(mockReq.status).toBe(201);
        expect(storyServices.postStory).toHaveBeenCalledWith(mockReq, mockRes, mockNext);
        expect(negotiate.negotiateData).toHaveBeenCalledWith(mockCreateStoryRespose, mockReq, mockRes, mockNext);
        expect(storyServices.postStory).toHaveBeenCalledTimes(1);
        expect(negotiate.negotiateData).toHaveBeenCalledTimes(1);
    });
});
describe('Story Update', () => {
    test('Update all okay', async () => {
        jest.clearAllMocks()
        const mockReq = mockRequest({ body: mockUpdateStories });
        const mockRes = mockResponse();
        const mockNext = jest.fn();
        mockReq.payload='username';
        mockReq.payload.userName = 'tanimahossain';
        mockReq.status = 200;
        jest.spyOn(storyServices, 'updateStory').mockReturnValue({
            status: 'success',
            message: 'Story updated Successfully',
        });
        jest.spyOn(negotiate, 'negotiateData').mockReturnValue({
            status: 'success',
            message: 'Story updated Successfully',
        });
        controller.updateStory(mockReq, mockRes, mockNext);
        await Promise.resolve();
        expect(mockReq.status).toBe(200);
        expect(storyServices.updateStory).toHaveBeenCalledWith(mockReq, mockRes, mockNext);
        expect(negotiate.negotiateData).toHaveBeenCalledWith({
            status: 'success',
            message: 'Story updated Successfully',
        }, mockReq, mockRes, mockNext);
        expect(storyServices.updateStory).toHaveBeenCalledTimes(1);
        expect(negotiate.negotiateData).toHaveBeenCalledTimes(1);
    });
});
describe('Story Delete', () => {
    test('Delete all okay', async () => {
        jest.clearAllMocks()
        const mockReq = mockRequest({ body: mockCreateStories[0] });
        const mockRes = mockResponse();
        const mockNext = jest.fn();
        mockReq.payload='username';
        mockReq.payload.userName = 'tanimahossain';
        mockReq.status = 200;
        mockReq.params.id = 'tanimahossain';

        jest.spyOn(storyServices, 'deleteStory').mockReturnValue({
            status: 'success',
            message: 'Story deleted Successfully',
        });
        jest.spyOn(negotiate, 'negotiateData').mockReturnValue({
            status: 'success',
            message: 'Story deleted Successfully',
        });

        controller.deleteStory(mockReq, mockRes, mockNext);
        await Promise.resolve();
        expect(mockReq.status).toBe(200);
        expect(storyServices.deleteStory).toHaveBeenCalledWith(mockReq, mockRes, mockNext);
        expect(negotiate.negotiateData).toHaveBeenCalledWith({
            status: 'success',
            message: 'Story deleted Successfully',
        }, mockReq, mockRes, mockNext);
        expect(storyServices.deleteStory).toHaveBeenCalledTimes(1);
        expect(negotiate.negotiateData).toHaveBeenCalledTimes(1);
    });
});
describe('Story View', () => {
    test('view a story all okay', async () => {
        jest.clearAllMocks()
        const mockReq = mockRequest();
        const mockRes = mockResponse();
        const mockNext = jest.fn();
        mockReq.status = 200;
        mockReq.params.id = 'tanimahossain_1';

        jest.spyOn(storyServices, 'getStory').mockReturnValue({
            status: 'success',
            message: 'User data fetched sucessfully',
            storyData: mockStoryResponse,
        });
        jest.spyOn(negotiate, 'negotiateData').mockReturnValue({
            status: 'success',
            message: 'User data fetched sucessfully',
            storyData: mockStoryResponse,
        });

        controller.getStory(mockReq, mockRes, mockNext);
        await Promise.resolve();
        expect(mockReq.status).toBe(200);
        expect(storyServices.getStory).toHaveBeenCalledWith(mockReq, mockRes, mockNext);
        expect(negotiate.negotiateData).toHaveBeenCalledWith({
            status: 'success',
            message: 'User data fetched sucessfully',
            storyData: mockStoryResponse,
        }, mockReq, mockRes, mockNext);
        expect(storyServices.getStory).toHaveBeenCalledTimes(1);
        expect(negotiate.negotiateData).toHaveBeenCalledTimes(1);
    });
});
describe('Story View', () => {
    test('view all stories all okay', async () => {
        jest.clearAllMocks()
        const mockReq = mockRequest();
        const mockRes = mockResponse();
        const mockNext = jest.fn();
        mockReq.status = 200;
        mockReq.params.id = 'tanimahossain_1';

        jest.spyOn(storyServices, 'getAllStories').mockReturnValue({
            status: 'success',
            message: 'Stories fetched Successfully',
            count: 5,
            storyData: mockStoriesResponse,
        });
        jest.spyOn(negotiate, 'negotiateData').mockReturnValue({
            status: 'success',
            message: 'Stories fetched Successfully',
            count: 5,
            storyData: mockStoriesResponse,
        });

        controller.getAllStories(mockReq, mockRes, mockNext);
        await Promise.resolve();
        expect(mockReq.status).toBe(200);
        expect(storyServices.getAllStories).toHaveBeenCalledWith(mockReq, mockRes, mockNext);
        expect(negotiate.negotiateData).toHaveBeenCalledWith({
            status: 'success',
            message: 'Stories fetched Successfully',
            count: 5,
            storyData: mockStoriesResponse,
        }, mockReq, mockRes, mockNext);
        expect(storyServices.getAllStories).toHaveBeenCalledTimes(1);
        expect(negotiate.negotiateData).toHaveBeenCalledTimes(1);
    });
});