import { envs } from "./config/plugins/envs.plugin";
import { ServerApp } from "./presentation/server"

(async () => {
    await main();
})();


function main() {
    //ServerApp.start();
    //console.log(envs.PORT);
}