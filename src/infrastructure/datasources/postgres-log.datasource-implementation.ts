import { PrismaClient, SeverityLevel } from '@prisma/client';
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

const prismaClient = new PrismaClient();

const severityEnum = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH
}

export class PostgresLogDatasource implements LogDatasource{
    async saveLog(log: LogEntity): Promise<void> {
        const { message, level, createdAt, origin } = log;
        const prismaLevel = severityEnum[level];
        await prismaClient.logModel.create({
            data: {
                message: message,
                level: prismaLevel,
                createdAt: createdAt,
                origin: origin
            }
        });
    }

    async getLogs(level: LogSeverityLevel): Promise<LogEntity[]> {
        const prismaLevel = severityEnum[level];
        const result = await prismaClient.logModel.findMany({
            where:{ level: prismaLevel }
        });
        return result.map(postgresLog=> LogEntity.fromObject(postgresLog));
    }

}