const { mockRequest, mockResponse } = require('jest-mock-req-res');
const services = require('../../services/storyServices');
const Story = require('../../models/storiesModel');

const mockCreateStories = [
    {
        authorName: 'el.duivel',
        storyTitle: 'First Story',
        storyDescription:
            'This is my first story for testing the story services. Let us if this works for create.',
    },
    {
        authorName: 'el.duivel',
        storyTitle: 'second Story',
        storyDescription:
            'This is my second story for testing the story services. Let us if this works for create.',
    },
    {
        authorName: 'lala land',
        storyTitle: 'second Story',
        storyDescription:
            'This is my second story for testing the story services. Let us if this works for create.',
    },
];
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
const mocketStoryResponse = {
    "storyId": "tanimahossain_2",
    "authorName": "el.duivel",
    "storyTitle": "tanima",
    "openingLines": "tanima wkjegriauwcyeoviuytiutynvoir ruqtoiuwytcvquiwe weoyurcvopuryt[pqweoicoirgytpuvnryqcp cvqopwnp...",
    "storyDescription": "tanima wkjegriauwcyeoviuytiutynvoir ruqtoiuwytcvquiwe weoyurcvopuryt[pqweoicoirgytpuvnryqcp cvqopwnpuorytqciiryvtqpoiccytunqpcvotu ovtupwyttuiymeoiurytnrt",
    "createdAt": "2022-05-09T09:02:16.000Z",
    "updatedAt": "2022-05-09T09:02:16.000Z",
    "authorUsername": "tanimahossain"
};
const mockUpdateStories = [
    {
        storyDescription:
            'This is my first story for testing the story services.',
    },
    {
        authorName: ' el.duivel ',
        storyTitle: ' second Story ',
    }
];
describe('Story Create', () => {
    test('create all okay', async () => {
        jest.clearAllMocks()
        const mockReq = mockRequest({ body: mockCreateStories[0] });
        const mockRes = mockResponse();
        const mockNext = jest.fn();
        mockReq.payload = {
            userName: 'tanimahossain',
        };
        jest.spyOn(Story, 'max').mockReturnValue(0);
        jest.spyOn(Story, 'create').mockImplementation((storyInfo) => {
            const Data = {
                status: 'success',
                message: 'story Created Succesfully.',
                storyId: storyInfo.storyId,
                authorName: storyInfo.authorName,
                storyTitle: storyInfo.storyTitle,
                openingLines: storyInfo.openingLines,
            };
            return Data;
        });
        const Data = await services.postStory(mockReq, mockRes, mockNext);
        expect(Data.status).toBe('success');
        expect(Data.message).toBe('Story Created Succesfully.');
        expect(Data.storyId).toBe(`${mockReq.payload.userName}_1`);
        expect(Data.authorName).toBe('el.duivel');
        expect(Data.openingLines).toBeTruthy();
    });

    test('create mx value error', async () => {
        jest.clearAllMocks()
        const mockReq = mockRequest({ body: mockCreateStories[0] });
        const mockRes = mockResponse();
        const mockNext = jest.fn();
        mockReq.payload = {
            userName: 'tanimahossain',
        };
        jest.spyOn(Story, 'max').mockReturnValue();
        jest.spyOn(Story, 'create').mockImplementation((storyInfo) => {
            const Data = {
                status: 'success',
                message: 'story Created Succesfully.',
                storyId: storyInfo.storyId,
                authorName: storyInfo.authorName,
                storyTitle: storyInfo.storyTitle,
                openingLines: storyInfo.openingLines,
            };
            return Data;
        });
        const Data = await services.postStory(mockReq, mockRes, mockNext);
        expect(Story.max).toHaveBeenCalledWith('storyNo', {
            where: { authorUsername: mockReq.payload.userName },
        });
        expect(Story.max).toHaveBeenCalledTimes(1);
        expect(mockNext).toHaveBeenCalledTimes(1);
        expect(Data).toBeUndefined();
    });
});

describe('View A Story', () => {
    test('view perfectly fine', async () => {
        jest.clearAllMocks();
        const mockReq = mockRequest();
        const mockRes = mockResponse();
        const mockNext = jest.fn();
        mockReq.params.id = 'tanimahossain_1'
        jest.spyOn(Story, 'findOne').mockReturnValue(mocketStoryResponse);
        const Data = await services.getStory(mockReq, mockRes, mockNext);
        expect(Story.findOne).toHaveBeenCalledWith({
            attributes: { exclude: ['storyNo'] },
            where: {
                storyId: mockReq.params.id.trim(),
            },
        });
        expect(Story.findOne).toHaveBeenCalledTimes(1);
        expect(Data.status).toBe('success');
        expect(Data.message).toBe('User data fetched sucessfully');
        expect(Data.storyData).toBe(mocketStoryResponse);
    });
    test('view no story to fetch', async () => {
        jest.clearAllMocks();
        const mockReq = mockRequest();
        const mockRes = mockResponse();
        const mockNext = jest.fn();
        mockReq.params.id = 'tanimahossain_1'
        jest.spyOn(Story, 'findOne').mockReturnValue(null);
        const Data = await services.getStory(mockReq, mockRes, mockNext);
        expect(Story.findOne).toHaveBeenCalledWith({
            attributes: { exclude: ['storyNo'] },
            where: {
                storyId: mockReq.params.id.trim(),
            },
        });
        expect(Story.findOne).toHaveBeenCalledTimes(1);
        expect(Data.status).toBe('failed');
        expect(Data.message).toBe('No such story');
        expect(Data.storyData).toBeUndefined();
    });
    test('view server error', async () => {
        jest.clearAllMocks();
        const mockReq = mockRequest();
        const mockRes = mockResponse();
        const mockNext = jest.fn();
        mockReq.params.id = 'tanimahossain_1'
        jest.spyOn(Story, 'findOne').mockReturnValue();
        const Data = await services.getStory(mockReq, mockRes, mockNext);
        expect(Story.findOne).toHaveBeenCalledWith({
            attributes: { exclude: ['storyNo'] },
            where: {
                storyId: mockReq.params.id.trim(),
            },
        });
        expect(Story.findOne).toHaveBeenCalledTimes(1);
        expect(mockNext).toHaveBeenCalledTimes(1);
        expect(Data).toBeUndefined();
    });
});

describe('View all Stories', () => {
    test('view all perfectly fine', async () => {
        jest.clearAllMocks();
        const mockReq = mockRequest();
        const mockRes = mockResponse();
        const mockNext = jest.fn();
        jest.spyOn(Story, 'findAll').mockReturnValue(mockStoriesResponse);
        const Data = await services.getAllStories(mockReq, mockRes, mockNext);
        expect(Story.findAll).toHaveBeenCalledWith({
            attributes: { exclude: ['storyDescription', 'storyNo'] },
        });
        expect(Story.findAll).toHaveBeenCalledTimes(1);
        expect(Data.status).toBe('success');
        expect(Data.message).toBe('Stories fetched Successfully');
        expect(Data.count).toBe(5);
        expect(Data.storyData).toBe(mockStoriesResponse);
    });

    test('view all no story available', async () => {
        jest.clearAllMocks();
        const mockReq = mockRequest();
        const mockRes = mockResponse();
        const mockNext = jest.fn();
        jest.spyOn(Story, 'findAll').mockReturnValue([]);
        const Data = await services.getAllStories(mockReq, mockRes, mockNext);
        expect(Story.findAll).toHaveBeenCalledWith({
            attributes: { exclude: ['storyDescription', 'storyNo'] },
        });
        expect(Story.findAll).toHaveBeenCalledTimes(1);
        expect(Data.status).toBe('success');
        expect(Data.message).toBe('No Stories to fetch');
        expect(Data.count).toBe(0);
        expect(Data.storyData.length).toBe(0);
    });

    test('view all sever error', async () => {
        jest.clearAllMocks();
        const mockReq = mockRequest();
        const mockRes = mockResponse();
        const mockNext = jest.fn();
        jest.spyOn(Story, 'findAll').mockReturnValue(null);
        const Data = await services.getAllStories(mockReq, mockRes, mockNext);
        expect(Story.findAll).toHaveBeenCalledWith({
            attributes: { exclude: ['storyDescription', 'storyNo'] },
        });
        expect(Story.findAll).toHaveBeenCalledTimes(1);
        expect(mockNext).toHaveBeenCalledTimes(1);
        expect(Data).toBeUndefined();
    });
});

describe("Delete Story", () => {
    test('Delete', async () => {
        jest.clearAllMocks();
        const mockReq = mockRequest();
        const mockRes = mockResponse();
        const mockNext = jest.fn();
        mockReq.params.id = 'tanimahossain_1';
        jest.spyOn(Story, 'destroy').mockImplementation((val) => {
            return;
        });
        const Data = await services.deleteStory(mockReq, mockRes, mockNext);
        expect(Story.destroy).toHaveBeenCalledWith({
            where: {
                storyId: mockReq.params.id.trim(),
            },
        });
        expect(Story.destroy).toHaveBeenCalledTimes(1);
        expect(Data.status).toBe('success');
        expect(Data.message).toBe('Story deleted Successfully');
    });
});
describe("Update Story",() => {
    test('update with no ifs', async () => {
        jest.clearAllMocks();
        const mockReq = mockRequest();
        const mockRes = mockResponse();
        const mockNext = jest.fn();

        mockReq.params.id = 'tanimahossain_1';
        mockReq.body = mockUpdateStories[0];
        const storyInfo = mockUpdateStories[0];
        if (mockUpdateStories[1].storyDescription) {
            storyInfo.openingLines = `${mockUpdateStories[1].storyDescription.slice(0, 100)}...`;
        } else{
            storyInfo.openingLines = mockUpdateStories[1].storyDescription;
        }
        if (storyInfo.authorName) storyInfo.authorName = storyInfo.authorName.trim();
        if (storyInfo.storyTitle) storyInfo.storyTitle = storyInfo.storyTitle.trim();
        
        jest.spyOn(Story, 'update').mockImplementation((val) => {
            return;
        });
        const Data = await services.updateStory(mockReq, mockRes, mockNext);
        expect(Story.update).toHaveBeenCalledWith(storyInfo, {
            where: {
                storyId: mockReq.params.id.trim(),
            },
        });
        expect(Story.update).toHaveBeenCalledTimes(1);
        expect(Data.status).toBe('success');
        expect(Data.message).toBe('Story updated Successfully');
    });
    test('update with all ifs', async () => {
        jest.clearAllMocks();
        const mockReq = mockRequest();
        const mockRes = mockResponse();
        const mockNext = jest.fn();

        mockReq.params.id = 'tanimahossain_1';
        mockReq.body = mockUpdateStories[1];
        const storyInfo = mockUpdateStories[1];
        if (mockUpdateStories[1].storyDescription) {
            storyInfo.openingLines = `${mockUpdateStories[1].storyDescription.slice(0, 100)}...`;
        } else{
            storyInfo.openingLines = mockUpdateStories[1].storyDescription;
        }
        if (storyInfo.authorName) storyInfo.authorName = storyInfo.authorName.trim();
        if (storyInfo.storyTitle) storyInfo.storyTitle = storyInfo.storyTitle.trim();
        
        jest.spyOn(Story, 'update').mockImplementation((val) => {
            return;
        });
        const Data = await services.updateStory(mockReq, mockRes, mockNext);
        expect(Story.update).toHaveBeenCalledWith(storyInfo, {
            where: {
                storyId: mockReq.params.id.trim(),
            },
        });
        expect(Story.update).toHaveBeenCalledTimes(1);
        expect(Data.status).toBe('success');
        expect(Data.message).toBe('Story updated Successfully');
    });
});