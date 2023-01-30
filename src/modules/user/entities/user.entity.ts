import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import TableName from '@database/tableName';
import AuthTokensEntity from '@modules/auth/entities/auth.tokens.entity';
import ActionTokensEntity from '@modules/auth/entities/action.tokens.entity';

@Entity(TableName.USER)
export default class UserEntity {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  public email: string;

  @Column({
    type: 'varchar',
    length: 150,
    nullable: false,
  })
  public name: string;

  @Column({
    nullable: true,
    type: 'timestamp',
  })
  public email_verified_at?: Date;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  public password: string;

  @CreateDateColumn({ type: 'timestamp' })
  public created_at?: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updated_at?: Date;

  @OneToMany(() => AuthTokensEntity, (authTokens) => authTokens.user)
  public auth_tokens: AuthTokensEntity[];

  @OneToMany(() => ActionTokensEntity, (tokens) => tokens.user)
  public action_tokens: ActionTokensEntity[];
}
