import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { SendEmailLogs } from "./send-email-logs";

describe('use-cases/email/send-email-logs.ts', () => {
    beforeEach(() => {
        jest.clearAllMocks(); 
    });

    const mockEmailService = {
        sendEmailWithFileSystemLogs: jest.fn()
    }

    const mockLogRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }

    const sendEmailLogs = new SendEmailLogs(mockEmailService as any, mockLogRepository);

    test('should call sendEmail and saveLog', async() => {
        mockEmailService.sendEmailWithFileSystemLogs.mockResolvedValue(true);

        const emailTest = 'miCorreo@gmail.com';
        const result = await sendEmailLogs.execute(emailTest);
        expect(result).toBe(true);
        expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1);
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
            message: expect.any(String),
            level: 'low',
            origin: expect.any(String),
            createdAt: expect.any(Date)
        });
    });


    test('should log in case of error', async() => {
        mockEmailService.sendEmailWithFileSystemLogs.mockResolvedValue(false);

        const emailTest = 'miCorreo@gmail.com';
        const result = await sendEmailLogs.execute(emailTest);
        expect(result).toBe(false);
        expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1);
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
            message: expect.any(String),
            level: 'high',
            origin: expect.any(String),
            createdAt: expect.any(Date)
        });
    });
});