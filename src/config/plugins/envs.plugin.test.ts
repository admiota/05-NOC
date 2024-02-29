import { envs } from "./envs.plugin";

describe('envs.plugin.ts', () => {
    test('should return envs options', () => {
        expect(envs).toEqual({
            PORT: 3000,
            MAILER_SERVICE: 'gmail',
            MAILER_EMAIL: 'adolfomiota1@gmail.com',
            MAILER_SECRET_KEY: 'uzvywainrkjdzyjh',
            PROD: true,
            MONGO_URL: 'mongodb://adolfo:123456@localhost:27017/',
            MONGO_DB_NAME: 'NOC-TEST',
            MONGO_USER: 'adolfo',
            MONGO_PASS: '123456789'
        });
    });

    test('should return error if PORT is not integer', async() => {
        process.env.PORT = 'ABC';

        try {
            jest.resetModules();
            //Nos esperamos a que envs plugin recoja ese dato PORT del process y lo analice
            await import('./envs.plugin');
            throw new Error();
        } catch (error) {
            expect(`${error}`).toContain('"PORT" should be a valid integer');
        }
    });
});