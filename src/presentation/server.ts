import { CronService } from './cron/cron-service';
import { CheckService } from '../domain/use-cases/checks/check-service';
import { LogRepositoryImplementation } from '../infrastructure/repositories/log.repository-implementation';
import { FileSystemDataSourceImplementation } from '../infrastructure/datasources/file-system.datasource-implementation';
import { EmailService } from './email/email-service';
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';
import { MongoDatasource } from '../infrastructure/datasources/mongo.datasource-implementation';
import { LogModel } from '../data/mongo';
import { LogSeverityLevel } from '../domain/entities/log.entity';

const logRepository = new LogRepositoryImplementation(
    //new FileSystemDataSourceImplementation()
    new MongoDatasource()
    //new MongoDBDataSourceImplementation
);

/*const mongoLogRepository = new LogRepositoryImplementation(   
);*/
const emailService = new EmailService();

export class ServerApp {

    public static async start() {
        console.log('Server started...');
        
        

        //Mandar email normal
        /*const emailService = new EmailService(fileSystemLogRepository);
        emailService.sendingEmail({
            to: 'isabel.pizcer@gmail.com',
            subject: 'Asunto Prueba',
            htmlBody: `
                        <div style="background-color: #ffffff; padding: 20px; border-radius: 5px;">
                            <h1 style="color: #333333;">¡Hola!</h1>
                            <p style="color: #666666;">Saludos cordiales,</p>
                            <p style="color: #666666; font-weight: bold;">Adolfo</p>
                        </div>
            `
        });*/

        //Mandar email con Logs desde mi caso de uso de emails:
        //new SendEmailLogs(emailService, fileSystemLogRepository).execute(['isabel.pizcer@gmail.com', 'adolfomiota1@gmail.com']);

        //Mandar logs por email
        /*const emailService = new EmailService();
        const toSend = ['isabel.pizcer@gmail.com','adolfomiota1@gmail.com'];
        emailService.sendFileWithFileSystemLogs(toSend);*/
        const logs = await logRepository.getLogs(LogSeverityLevel.low);
        console.log(logs)
        //  CronService.createJob(
        //      //TIEMPO
        //      '*/5 * * * * *',
        //      //FUNCIÓN QUE DEFINE LO QUE HACE CADA ESE TIEMPO
        //      () => {
        //          const url = 'https://google.com';
        //          new CheckService(
        //              logRepository,            //DATASOURCE
        //              () => console.log('Success: '+url), //CALLBACKSUCCESS
        //              (error) => console.log(error)       //CALLBACKERROR
        //          ).execute(url)

        //     //         //console.log(checkService);
        //      }
        //  );
    }


}