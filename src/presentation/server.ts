import { CronJob } from 'cron';
import { CronService } from './cron/cron-service';
import { CheckService } from '../domain/use-cases/checks/check-service';

export class ServerApp {

    public static start() {
        console.log('Server started...');

        CronService.createJob(
            //TIEMPO
            '*/10 * * * * *',
            //FUNCIÓN QUE DEFINE LO QUE HACE CADA ESE TIEMPO
            () => {
                const date = new Date();
                console.log(date,'10 seconds')
            }
        );

        CronService.createJob(
            //TIEMPO
            '*/5 * * * * *',
            //FUNCIÓN QUE DEFINE LO QUE HACE CADA ESE TIEMPO
            () => {
                const url = 'https://google.com';
                const checkService = new CheckService(
                    () => console.log('Success: '+url),
                    (error) => console.log(error)
                ).execute(url)

                //console.log(checkService);
            }
        );
    }


}