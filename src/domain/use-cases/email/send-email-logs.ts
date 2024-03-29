import { EmailService } from "../../../presentation/email/email-service";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";


interface SendLogEmailUseCase{
    execute: (to:string | string[])=> Promise<boolean>
}

export class SendEmailLogs implements SendLogEmailUseCase{
    constructor(
        private readonly emailService:EmailService,
        private readonly logRepository:LogRepository,
    ) {
        
    }

    async execute(to: string | string[]) {
        try {
            const sent = await this.emailService.sendEmailWithFileSystemLogs(to);
            if (!sent) throw new Error('Error al enviar email');
            const log = new LogEntity({
                message: `Email sent to ${to}`,
                level: LogSeverityLevel.low,
                origin: 'send-emails-logs'
            });
            this.logRepository.saveLog(log);
            return true;
        } catch (error) {
            const log = new LogEntity({ 
                message: `Email NOT sent to ${to}: ${error}`,
                level: LogSeverityLevel.high,
                origin: 'send-emails-logs'
            });
            this.logRepository.saveLog(log);
            return false;
        }
    };

}