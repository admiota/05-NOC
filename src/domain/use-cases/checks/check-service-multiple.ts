import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceMultipleUseCase{
    execute(url: string): Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error:string) => void) | undefined;
const originFile = 'check-service.ts';
export class CheckServiceMultiple implements CheckServiceMultipleUseCase{
    constructor(
        private readonly logRepositories: LogRepository[],
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback
    ) {
        
    }

    public async execute(url:string):Promise<boolean> {
        try { 
            const req = await fetch(url);
            if (!req.ok) {
                throw new Error(`ERROR EN LA REQUEST ${url}`);
            }
            const log = new LogEntity({
                message: `Service ${url} working`,
                level: LogSeverityLevel.low,
                origin: originFile
            });
            this.logRepositories.forEach(async logRepository => await logRepository.saveLog(log));
            this.successCallback && this.successCallback();
            return true;
        } catch (error) {
            const errorMessage = `${url} is not ok: ${error}`;
            const log = new LogEntity({
                message: errorMessage,
                level: LogSeverityLevel.high,
                origin: originFile
            });
            this.logRepositories.forEach(async logRepository => await logRepository.saveLog(log));
            this.errorCallback && this.errorCallback(errorMessage);
            
            return false;
        }
    }
}