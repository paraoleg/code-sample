import { EntityRepository, Repository } from 'typeorm';
import ActionTokensEntity from '@modules/auth/entities/action.tokens.entity';

@EntityRepository(ActionTokensEntity)
export class ActionTokensRepository extends Repository<ActionTokensEntity> {}
