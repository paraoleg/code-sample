import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as getOrmConfig from './database/ormconfig';
import { validationOptions, validationSchema } from '@common/config.validation';
import { LoggerModule } from '@common/logger/logger.module';
import { HealthCheckModule } from '@modules/health-check/health-check.module';
import { UserModule } from '@modules/user/user.module';
import { AuthModule } from '@modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      validationSchema,
      validationOptions,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => getOrmConfig(configService),
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    LoggerModule,
    HealthCheckModule,
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
