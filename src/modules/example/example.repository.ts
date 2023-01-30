import { EntityRepository, Repository } from 'typeorm';
import { ExampleEntity } from '@modules/example/example.entity';

// You can put some huge sql requests inside or another database related logic

@EntityRepository(ExampleEntity)
export class ExampleRepository extends Repository<ExampleEntity> {}
