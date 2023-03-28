import { createLogger, Logger, transports } from 'winston';

export function getLogger(): Logger {
  const logger = createLogger({
    transports: [
      new transports.Console(),
      new transports.File({ filename: 'logs/error.log', level: 'error' }),
      new transports.File({ filename: 'logs/combined.log' }),
    ],
  });
  return logger;
}
