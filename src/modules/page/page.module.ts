// You can remove these files

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExampleRepository } from '@modules/example/example.repository';
import { ExampleController } from '@modules/example/example.controller';
import { ExampleService } from '@modules/example/example.service';
import { LoggerModule } from '@common/logger/logger.module';

@Module({
  imports: [TypeOrmModule.forFeature([ExampleRepository]), LoggerModule],
  controllers: [ExampleController],
  providers: [ExampleService],
})
export class ExampleModule {}
