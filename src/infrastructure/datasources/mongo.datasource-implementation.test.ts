import mongoose from "mongoose";
import { envs } from "../../config/plugins/envs.plugin";
import { LogModel, MongoDatabase } from "../../data/mongo";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { MongoDatasource } from "./mongo.datasource-implementation";

describe('infrastructure/datasource/mongo.datasource-implementation.ts', () => {
    const mongoDatasource = new MongoDatasource();

    beforeAll(async () => {
        await MongoDatabase.connect({
            dbName: envs.MONGO_DB_NAME,
            mongoUrl: envs.MONGO_URL
        });
    });

    afterEach(async() => {
        await LogModel.deleteMany();
    });

    afterAll(async() => {
        await mongoose.connection.close(); 
    });
    
    test('should create a new log', async () => {
        const log = new LogEntity({
            message: 'Test message',
            level: LogSeverityLevel.low,
            origin: 'mongo.datasource-implementation.test.ts'
        });
        const logSpy = jest.spyOn(console, 'log')
        
        await mongoDatasource.saveLog(log);
        //QUIERO ASEGURARME DE QUE HA GUARDADO(PROBLEMA QUE ES VOID)
        expect(logSpy).toHaveBeenCalledTimes(1);
        expect(logSpy).toHaveBeenCalledWith("Mongo Log created:", expect.any(String));
    });

    test('should get all logs', async() => {
        const level = LogSeverityLevel.low;
        const logs = await mongoDatasource.getLogs(level);
        expect(logs[0].level).toBe('low');
        //QUIERO ASEGURARME DE QUE HA GUARDADO(PROBLEMA QUE ES VOID)
    });
});