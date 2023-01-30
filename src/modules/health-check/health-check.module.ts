import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthCheckController } from './health-check.controller';

@Module({
  imports: [ConfigModule],
  controllers: [HealthCheckController],
})
export class HealthCheckModule {}
