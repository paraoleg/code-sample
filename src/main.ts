import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { LoggerService } from '@common/logger/logger.service';
import { AllExceptionsFilter } from '@common/filters/exception.filter';
import { TransformInterceptor } from '@common/interceptors/transformResponse.interceptor';

async function bootstrap() {
  let loggerService: LoggerService;
  try {
    const app = await NestFactory.create(AppModule, {
      logger: new LoggerService('Application'),
      bufferLogs: true,
    });

    loggerService = new LoggerService('Application');

    app.useLogger(loggerService);
    app.useGlobalFilters(new AllExceptionsFilter());
    app.useGlobalInterceptors(new TransformInterceptor());
    app.enableVersioning({
      type: VersioningType.URI, // https://docs.nestjs.com/techniques/versioning
      defaultVersion: ['1'],
    });
    app.useGlobalPipes(
      new ValidationPipe({
        skipUndefinedProperties: true,
        skipMissingProperties: true,
        forbidUnknownValues: true,
        transform: true,
      }),
    );
    app.enableCors();
    app.use(helmet());

    process.on('uncaughtException', (e) =>
      loggerService.error(e, null, 'unhandledRejection'),
    );

    process.on('unhandledRejection', (reason) =>
      loggerService.error(reason, null, 'unhandledRejection'),
    );

    const configService = app.get(ConfigService);
    const basePath = configService.get('BASE_PATH');

    if (basePath) {
      app.setGlobalPrefix(basePath);
    }

    const options = new DocumentBuilder()
      .setTitle('Node NestJS base project')
      .setDescription('This is API documentation')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, options);

    const SWAGGER_PATH = basePath ? `${basePath}/docs` : 'docs';
    SwaggerModule.setup(SWAGGER_PATH, app, document);

    const PORT = configService.get<number>('PORT') || 3000;
    await app.listen(PORT);

    loggerService.log(`Port: ${PORT}. Swagger path: :${PORT}/${SWAGGER_PATH}`);
  } catch (e) {
    if (loggerService) {
      loggerService.error(e);
    } else {
      global.console.log('Application crashed!', e);
    }

    process.exit(1);
  }
}

bootstrap().then();
