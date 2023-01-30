import { ApiProperty, getSchemaPath } from '@nestjs/swagger';

export class ExampleDto {
  @ApiProperty()
  public id?: number;

  @ApiProperty()
  public name: string;

  @ApiProperty()
  public content: string;

  @ApiProperty({ nullable: true })
  public metaTitle?: string;

  @ApiProperty({ nullable: true })
  public metaDescription?: string;

  @ApiProperty({ nullable: true })
  public slug?: string;

  @ApiProperty({ nullable: true })
  public sortOrder?: number;

  @ApiProperty()
  public createdAt?: Date;

  @ApiProperty()
  public updatedAt?: Date;
}

export class ResponseExampleDto {
  @ApiProperty({ type: ExampleDto })
  entity: ExampleDto;
}

export class ResponseExamplesDto {
  @ApiProperty({ type: 'array', items: { $ref: getSchemaPath(ExampleDto) } })
  entities: ExampleDto[];
}
