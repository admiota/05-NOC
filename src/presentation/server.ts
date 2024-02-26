import { CronService } from './cron/cron-service';
import { CheckService } from '../domain/use-cases/checks/check-service';
import { LogRepositoryImplementation } from '../infrastructure/repositories/log.repository-implementation';
import { FileSystemDataSourceImplementation } from '../infrastructure/datasources/file-system.datasource-implementation';

const fileSystemLogRepository = new LogRepositoryImplementation(
    new FileSystemDataSourceImplementation()
    //new PostgreSQLDataSourceImplementation
    //new MongoDBDataSourceImplementation
);

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
                new CheckService(
                    fileSystemLogRepository,            //DATASOURCE
                    () => console.log('Success: '+url), //CALLBACKSUCCESS
                    (error) => console.log(error)       //CALLBACKERROR
                ).execute(url)

                //console.log(checkService);
            }
        );
    }


}