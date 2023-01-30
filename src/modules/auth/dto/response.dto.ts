import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '@modules/user/dto/response.dto';

export class TokenDataDto {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  expiredAt: number;
}

export class UserWithTokenDataDto extends UserDto {
  @ApiProperty({ type: TokenDataDto })
  tokenData: TokenDataDto;
}

export class ResponseAuthDto {
  @ApiProperty({ type: UserWithTokenDataDto })
  result: UserWithTokenDataDto;
}
