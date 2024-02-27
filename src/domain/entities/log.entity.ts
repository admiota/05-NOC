
export enum LogSeverityLevel{
    low = 'low',
    medium = 'medium',
    high = 'high',
}

export interface LogEntityOptions{
    message: string,
    level: LogSeverityLevel,
    createdAt?: Date,
    origin: string
}

export class LogEntity{
    public message: string;
    public level: LogSeverityLevel; //Enum
    public createdAt: Date;
    public origin: string;

    constructor(options: LogEntityOptions) {
        const { message, level, createdAt = new Date(), origin } = options;
        this.message = message;
        this.level = level;
        this.createdAt = createdAt;
        this.origin = origin;
    }

    static fromJson = (json:string):LogEntity => {
        const { message, level, createdAt, origin } = JSON.parse(json);
        
        const log = new LogEntity({
            message: message,
            level: level,
            createdAt: createdAt,
            origin: origin
        });

        return log;
    }
}