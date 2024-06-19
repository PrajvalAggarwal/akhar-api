import { format,createLogger,transports } from 'winston';

const enumerateErrorFormat = format((info) => {
    if (info instanceof Error) {
        Object.assign(info, { message: info.stack });
    }
    return info;
});

const logger = createLogger({
    format: format.combine(
        enumerateErrorFormat(),
        format.colorize(),
        format.splat(),
        format.printf(({ level, message }) => `${level}: ${message}`)
    ),
    transports: [
        new transports.Console({
            stderrLevels: ['error'],
        }),
    ],
});

module.exports = logger;