import { LogEntity } from "../../entities/log.entity";
import { CheckServiceMultiple } from "./check-service-multiple";

describe('use-cases/checks/check-service-multiple.ts', () => {
    const mockRepo1 = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }
    const mockRepo2 = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }
    const mockRepo3 = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should call successCallback when fetch returns OK', async() => {
        
        const successCallback = jest.fn();
        const errorCallback = jest.fn();
        
        const url = 'https://www.google.com';
        
        const checkService = new CheckServiceMultiple(
            [mockRepo1, mockRepo2, mockRepo3],
            successCallback,
            errorCallback
        );

        const wasOk = await checkService.execute(url);

        expect(wasOk).toBe(true);
        expect(mockRepo1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockRepo2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockRepo3.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(successCallback).toHaveBeenCalled();
        expect(errorCallback).not.toHaveBeenCalled();
    });

    test('should call errorCallback when fetch fails(!OK)', async() => {

        const successCallback = jest.fn();
        const errorCallback = jest.fn();
        
        const url = 'https://www.google.com';
        
        const checkService = new CheckServiceMultiple(
            [mockRepo1, mockRepo2, mockRepo3],
            successCallback,
            errorCallback
        );

        const wasOk = await checkService.execute(url);

        expect(wasOk).toBe(false);
        expect(mockRepo1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockRepo2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockRepo3.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(errorCallback).toHaveBeenCalled();
        expect(successCallback).not.toHaveBeenCalled();
    });
});