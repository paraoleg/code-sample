import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateExampleDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  public name?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  public content?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  public metaTitle?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  public metaDescription?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  public slug?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  public sortOrder?: number;
}
