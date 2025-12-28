import winston from 'winston';
import { LOG_FILE, LOG_LEVEL } from '../config/config';

const logger = winston.createLogger({
  level: LOG_LEVEL,
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
    new winston.transports.File({
      filename: LOG_FILE,
      level: LOG_LEVEL,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
          return `${timestamp} ${level}: ${message}`;
        })
      ),
    }),
  ],
});

export default logger;
