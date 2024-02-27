import { envs } from "./config/plugins/envs.plugin";
import { MongoDatabase } from "./data/mongo";
import { ServerApp } from "./presentation/server"

(async () => {
    await main();
})();


async function main() {
    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME,
    });

    //Crear una colección = tabla // documento = registro en un row
    /*const newLog = await LogModel.create({
        message: 'text message',
        level: 'low',
        origin: 'App.ts'
    });

    await newLog.save();

    console.log(newLog);*/

    /*const logs = await LogModel.find();
    console.log(logs[1].message);*/

    ServerApp.start();
}