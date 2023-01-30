import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import UsersModel from '../../user/entities/user.entity';
import TableName from '@database/tableName';

export enum ACTION {
  PASSWORD = 'password',
  EMAIL = 'email',
}

@Entity(TableName.ACTION_TOKEN)
export default class ActionTokensEntity {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({
    type: 'int',
    nullable: false,
  })
  public user_id: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  public token: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  public action: ACTION;

  @Column({
    type: 'int',
    precision: 4,
    nullable: false,
  })
  public expires_at: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public data: string;

  @CreateDateColumn({ type: 'timestamp' })
  public created_at?: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updated_at?: Date;

  @ManyToOne(() => UsersModel, (user) => user.action_tokens, {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  public user: UsersModel;
}
