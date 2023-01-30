import * as Transport from 'winston-transport';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { join } from 'path';
import { isEmpty, omit } from 'lodash';

const LOG_LEVEL_FOR = {
  CONSOLE: 'info',
  FILE: 'warn',
  GLOBAL: 'debug',
};

const init = () => {
  const transports: Transport[] = [
    new winston.transports.Console({
      level: LOG_LEVEL_FOR.CONSOLE,
    }),
  ];

  if (process.env.LOGGING_TO_FILE === 'true') {
    transports.push(
      new winston.transports.DailyRotateFile({
        filename: 'application-%DATE%.log',
        dirname: join(process.cwd(), 'logs'),
        handleExceptions: true,
        level: LOG_LEVEL_FOR.FILE,
        zippedArchive: true,
        maxSize: '50m',
        maxFiles: '14d',
      }),
    );
  }

  return winston.createLogger({
    level: LOG_LEVEL_FOR.GLOBAL,
    transports,
    exitOnError: false,
    format: winston.format.combine(
      winston.format.errors({ stack: true }),
      winston.format.metadata(),
      winston.format.colorize(),
      winston.format.splat(),
      winston.format.timestamp(),
      winston.format.printf(({ level, message, timestamp, metadata }) => {
        let msg = `[${timestamp}] (${
          metadata.context ? metadata.context : 'WITHOUT CONTEXT'
        }) [${level}] - ${message}`;

        if (metadata.trace) {
          msg += `\nTrace: ${metadata.trace}`;
        }

        if (metadata.stack) {
          msg += `\nStack: ${metadata.stack}`;
        }

        const clearedMetadata = omit(metadata, ['trace', 'stack', 'context']);

        if (!isEmpty(clearedMetadata)) {
          msg += '\nMetadata: ' + JSON.stringify(clearedMetadata);
        }

        return msg;
      }),
    ),
  });
};

export default {
  init,
  LOG_LEVEL_FOR,
};
