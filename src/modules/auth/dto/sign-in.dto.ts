import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public password: string;
}
