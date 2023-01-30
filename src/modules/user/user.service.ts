import { Injectable } from '@nestjs/common';
import { LoggerService } from '@common/logger/logger.service';
import { UserRepository } from '@modules/user/user.repository';

@Injectable()
export class UserService {
  constructor(
    private loggerService: LoggerService,
    public readonly userRepository: UserRepository,
  ) {
    this.loggerService.setContext('UserService');
  }

  /**
   * @param id
   */
  public async findOneById(id: number) {
    return this.userRepository.findOne({ id });
  }

  /**
   * @param email
   */
  public async findOneByEmail(email: string) {
    return this.userRepository.findOne({ email });
  }
}
