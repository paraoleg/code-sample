import { ApiProperty, getSchemaPath } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  public id: number;

  @ApiProperty()
  public email: string;

  @ApiProperty()
  public name: string;

  @ApiProperty()
  public emailVerifiedAt?: Date;

  @ApiProperty()
  public createdAt: Date;

  @ApiProperty()
  public updatedAt: Date;
}

export class ResponseUserDto {
  @ApiProperty({ type: UserDto })
  entity: UserDto;
}

export class ResponseUsersDto {
  @ApiProperty({ type: 'array', items: { $ref: getSchemaPath(UserDto) } })
  entities: UserDto[];
}
