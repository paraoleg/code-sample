import * as winston from 'winston';
import { Injectable, ConsoleLogger, Scope } from '@nestjs/common';
import WinstonLogger from './winston.service';

const winstonLogger = WinstonLogger.init();

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends ConsoleLogger {
  public logger: winston.Logger;

  constructor(context?: string) {
    super(context);
    this.logger = winstonLogger;
  }

  public errorWithData(message: any, meta: Record<string, any>): void {
    this.logger.error(message, {
      ...meta,
      context: meta.context || this.context,
    });
  }

  public error(message: any, trace?: string | null, context?: string): void {
    this.logger.error(message, {
      context: context || this.context,
      trace: trace ? trace : undefined,
    });
  }

  public log(message: any, context?: string): void {
    this.logger.info(message, { context: context || this.context });
  }

  public warn(message: any, context?: string): void {
    this.logger.warn(message, { context: context || this.context });
  }

  public debug(message: any, context?: string): void {
    this.logger.debug(message, { context: context || this.context });
  }

  public verbose(message: any, context?: string): void {
    this.logger.verbose(message, { context: context || this.context });
  }
}
