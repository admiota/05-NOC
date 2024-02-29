import { LogEntity, LogSeverityLevel } from "./log.entity";

describe('domain/entities/log.entity.test.ts', () => {
    const dataObj = {
        message: 'Hola Mundo',
        level: LogSeverityLevel.low,
        origin: 'log.enntity.tes.ts'
    }
    test('should create a LogEntity instance', () => {
        const log = new LogEntity(dataObj);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(dataObj.message);
        expect(log.level).toBe(dataObj.level);
        expect(log.origin).toBe(dataObj.origin);
        expect(log.createdAt).toBeInstanceOf(Date);
    });

    test('should create a LogEntity instance from json', () => {
        const jsonLog = `{"message":"https://googleeMulti.com is not ok: TypeError: fetch failed","level":"high","createdAt":"2024-02-28T11:01:30.090Z","origin":"check-service.ts"}`;
        const log = LogEntity.fromJson(jsonLog);
        
        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe("https://googleeMulti.com is not ok: TypeError: fetch failed");
        expect(log.level).toBe(LogSeverityLevel.low);
        expect(log.origin).toBe("check-service.ts");
        expect(log.createdAt).toBeInstanceOf(Date);
    });

    test('should create a LogEntity instance from json', () => {
        const log = LogEntity.fromObject(dataObj);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(dataObj.message);
        expect(log.level).toBe(dataObj.level);
        expect(log.origin).toBe(dataObj.origin);
        expect(log.createdAt).toBeInstanceOf(Date);
    });
});