import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from '@common/logger/logger.module';
import { AuthService } from '@modules/auth/auth.service';
import { UserModule } from '@modules/user/user.module';
import { AuthController } from '@modules/auth/auth.controller';
import { LocalStrategy } from '@modules/auth/strategy/local.strategy';
import { ActionTokensRepository } from '@modules/auth/repositories/action.tokens.repository';
import { AuthTokensRepository } from '@modules/auth/repositories/auth.tokens.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ActionTokensRepository, AuthTokensRepository]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        signOptions: {
          expiresIn: +configService.get<string>('JWT_TTL'),
        },
        secret: configService.get<string>('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
    LoggerModule,
    UserModule,
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
