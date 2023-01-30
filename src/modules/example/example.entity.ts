import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import BaseModel from '@database/base.entity';
import TableName from '@database/tableName';

@Entity(TableName.PAGE)
export class ExampleEntity extends BaseModel {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  public name: string;

  @Column({
    type: 'mediumtext',
    nullable: false,
  })
  public content: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public meta_title?: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  public meta_description?: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public slug?: string;

  @Column({
    type: 'int',
    precision: 2,
    nullable: true,
  })
  public sort_order?: number;

  @CreateDateColumn({ type: 'timestamp' })
  public created_at?: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updated_at?: Date;
}
