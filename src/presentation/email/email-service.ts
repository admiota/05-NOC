import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

interface SendEmailOptions{
    to: string | string[],
    subject: string,
    htmlBody: string,
    attachments?: Attachement[]
}

interface Attachement {
    filename: string,
    path:string
}


export class EmailService{
    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    });
    
    constructor() {
         
    }

    async sendingEmail(options: SendEmailOptions): Promise<boolean> {
        const { to, subject, htmlBody, attachments=[] } = options;
        try {
            const sentInformation = await this.transporter.sendMail({ to: to, subject: subject, html: htmlBody, attachments:attachments});
            return true;
        } catch (error) {
            console.log(error);

            return false;
        }
    }

    async sendFileWithFileSystemLogs(toSend:string | string[]) {
        try {
            const to = toSend;
            const subject = 'Logs del servidor';
            const htmlBody = `<h2>Estos son los logs del servidor</h2>`;
            const attachments: Attachement[] = [
                {filename: 'logs-all.log',path: './logs/logs-all.log'},
                {filename: 'logs-high.log',path: './logs/logs-high.log'},
                {filename: 'logs-medium.log',path: './logs/logs-medium.log'},
            ];

            this.sendingEmail({
                to,
                subject,
                htmlBody,
                attachments
            });
            return true;
        } catch (error) {
            return false;
        }
        
    }    
}