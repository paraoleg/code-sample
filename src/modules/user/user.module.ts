import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from '@common/logger/logger.module';
import { UserRepository } from '@modules/user/user.repository';
import { UserService } from '@modules/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]), LoggerModule],
  controllers: [],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
