import { LogEntity } from "../../entities/log.entity";
import { CheckService } from "./check-service";

describe('use-cases/checks/check-service.ts', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })
    test('should call successCallback when fetch returns OK', async() => {
        const mockRepository = {
            saveLog: jest.fn(),
            getLogs: jest.fn()
        }
        const successCallback = jest.fn();
        const errorCallback = jest.fn();
        
        const url = 'https://www.google.com';
        
        const checkService = new CheckService(
            mockRepository,
            successCallback,
            errorCallback
        );

        const wasOk = await checkService.execute(url);

        expect(wasOk).toBe(true);
        expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(successCallback).toHaveBeenCalled();
        expect(errorCallback).not.toHaveBeenCalled();
    });

    test('should call errorCallback when fetch fails(!OK)', async() => {
        const mockRepository = {
            saveLog: jest.fn(),
            getLogs: jest.fn()
        }
        const successCallback = jest.fn();
        const errorCallback = jest.fn();
        
        const url = 'https://www.google.com';
        
        const checkService = new CheckService(
            mockRepository,
            successCallback,
            errorCallback
        );

        const wasOk = await checkService.execute(url);

        expect(wasOk).toBe(false);
        expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(errorCallback).toHaveBeenCalled();
        expect(successCallback).not.toHaveBeenCalled();
    });
});