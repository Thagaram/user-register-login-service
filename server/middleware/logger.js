import pino from 'pino';
import { logFormatter } from './logFormatter';

let logger;

//creating pino custom loggers
export function createLogger({ level }){
    logger = pino({
        level,
        mixin: (level) => {
            return { level: logger.levels.labels[level] };
        },
        formatters: {
            log: logFormatter,
            level: (label) => ({ level: label }),
        },
    });
}

export function getLogger(){
    return logger;
}
