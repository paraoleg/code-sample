import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { ApiResponseWrapper } from '@common/http/wrappers/apiResponseWrapper';
import { ApiErrorResponseWrapper } from '@common/http/wrappers/apiErrorResponseWrapper';
import { CreateExampleDto } from '@modules/example/dto/create.dto';
import { ExampleService } from '@modules/example/example.service';
import { BaseController } from '@common/base.controller';
import {
  ResponseExampleDto,
  ResponseExamplesDto,
  ExampleDto,
} from '@modules/example/dto/response.dto';
import { ExampleEntity } from '@modules/example/example.entity';
import { UpdateExampleDto } from '@modules/example/dto/update.dto';

const PATH = 'example';

@ApiTags(PATH)
@Controller(PATH)
@ApiExtraModels(ResponseExamplesDto, ResponseExampleDto, ExampleDto)
export class ExampleController extends BaseController {
  constructor(private exampleService: ExampleService) {
    super();
  }

  @Get()
  @ApiResponseWrapper(ResponseExamplesDto)
  async findAll(): Promise<ResponseExamplesDto> {
    const entities = await this.exampleService.getAll();
    return {
      entities: entities.map((entity) => this.prepareResponse(entity)),
    };
  }

  @Get(':id')
  @ApiResponseWrapper(ResponseExampleDto)
  @ApiErrorResponseWrapper({ status: HttpStatus.NOT_FOUND })
  async findOne(@Param('id') id: number): Promise<ResponseExampleDto> {
    const entity = await this.exampleService.getOneById(id);

    if (!entity) {
      throw new NotFoundException();
    }

    return { entity: this.prepareResponse(entity) };
  }

  @Post()
  @ApiResponseWrapper(ResponseExampleDto, { status: HttpStatus.CREATED })
  @ApiErrorResponseWrapper({ status: HttpStatus.BAD_REQUEST })
  async create(
    @Body() createDto: CreateExampleDto,
  ): Promise<ResponseExampleDto> {
    const entity = await this.exampleService.create(createDto);
    return { entity: this.prepareResponse(entity) };
  }

  @Put(':id')
  @ApiResponseWrapper(ResponseExampleDto, { status: HttpStatus.CREATED })
  @ApiErrorResponseWrapper({ status: HttpStatus.BAD_REQUEST })
  async update(
    @Param('id') id: number,
    @Body() updateDto: UpdateExampleDto,
  ): Promise<ResponseExampleDto> {
    const entity = await this.exampleService.getOneById(id);

    if (!entity) {
      throw new NotFoundException();
    }

    const updatedEntity = await this.exampleService.update(id, updateDto);
    return { entity: this.prepareResponse(updatedEntity) };
  }

  @Delete(':id')
  @ApiResponseWrapper(ResponseExampleDto)
  @ApiErrorResponseWrapper({ status: HttpStatus.BAD_REQUEST })
  async delete(@Param('id') id: number): Promise<{ success: boolean }> {
    const entity = await this.exampleService.getOneById(id);

    if (!entity) {
      throw new NotFoundException();
    }

    await this.exampleService.deleteById(id);
    return { success: true };
  }

  /**
   * @param entity
   * @private
   */
  private prepareResponse(entity: ExampleEntity) {
    return {
      id: entity.id,
      name: entity.name,
      content: entity.content,
      metaTitle: entity.meta_title,
      sortOrder: entity.sort_order,
      createdAt: entity.created_at,
      updatedAt: entity.updated_at,
      metaDescription: entity.meta_description,
    };
  }
}
