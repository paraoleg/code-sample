import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '@modules/user/user.service';
import { SignUpDto } from '@modules/auth/dto/sign-up.dto';
import UserEntity from '@modules/user/entities/user.entity';
import { TokenDataDto } from '@modules/auth/dto/response.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  /**
   * @description Validate user
   * @param email
   * @param pass
   */
  public async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      return null;
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      return null;
    }

    return user;
  }

  /**
   * @description Get tokens
   * @param user
   */
  public async getTokens(user: UserEntity): Promise<TokenDataDto> {
    const payload = { username: user.name, sub: user.id };
    return {
      accessToken: await this.jwtService.signAsync(payload),
      expiredAt: +this.configService.get<string>('JWT_TTL'),
    };
  }

  /**
   * @description Sign up new user
   * @param data
   */
  public async signUpNewUser(data: SignUpDto) {
    const { email, password, name } = data;
    const hashedPassword = await this.getPasswordHash(password);
    return this.usersService.userRepository.save({
      name,
      email,
      password: hashedPassword,
    });
  }

  /**
   * @description Get password hash
   * @param password
   */
  private async getPasswordHash(password: string) {
    return bcrypt.hash(password, 10);
  }

  /**
   * @description Prepare user data
   * @param user
   */
  public prepareUserData(user: UserEntity) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      emailVerifiedAt: user.email_verified_at,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    };
  }
}
