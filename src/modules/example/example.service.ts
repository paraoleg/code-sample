import { DeleteResult } from 'typeorm';
import { omitBy, isUndefined, isEmpty } from 'lodash';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LoggerService } from '@common/logger/logger.service';
import { ExampleRepository } from '@modules/example/example.repository';
import { CreateExampleDto } from '@modules/example/dto/create.dto';
import { ExampleEntity } from '@modules/example/example.entity';
import { UpdateExampleDto } from '@modules/example/dto/update.dto';

@Injectable()
export class ExampleService {
  constructor(
    private loggerService: LoggerService,
    public readonly exampleRepository: ExampleRepository,
  ) {
    this.loggerService.setContext('ExampleService');
  }

  /**
   * @description Get all
   */
  public async getAll(): Promise<ExampleEntity[]> {
    return this.exampleRepository.find({});
  }

  /**
   * @description Get one by id
   */
  public async getOneById(id: number): Promise<ExampleEntity> {
    return this.exampleRepository.findOne({ id });
  }

  /**
   * @description Create
   */
  public async create(createData: CreateExampleDto): Promise<ExampleEntity> {
    const exampleEntity = new ExampleEntity();
    exampleEntity.name = createData.name;
    exampleEntity.content = createData.content;
    exampleEntity.meta_title = createData.metaTitle;
    exampleEntity.sort_order = createData.sortOrder;
    exampleEntity.meta_description = createData.metaDescription;
    return this.exampleRepository.save(exampleEntity);
  }

  /**
   * @description Update
   */
  public async update(id: number, updateData: UpdateExampleDto): Promise<any> {
    const partialEntity = omitBy(
      {
        name: updateData.name,
        content: updateData.content,
        meta_title: updateData.metaTitle,
        sort_order: updateData.sortOrder,
        meta_description: updateData.metaDescription,
      },
      isUndefined,
    );

    if (isEmpty(partialEntity)) {
      throw new BadRequestException('No data has been transferred');
    }

    const result = await this.exampleRepository.update({ id }, partialEntity);

    if (!result.affected) {
      throw new NotFoundException('Example not found');
    }

    return this.exampleRepository.findOne({ id });
  }

  /**
   * @description Delete by id
   */
  public async deleteById(id: number): Promise<DeleteResult> {
    return this.exampleRepository.delete({ id });
  }
}
