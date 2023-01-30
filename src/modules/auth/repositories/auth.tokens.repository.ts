import { EntityRepository, Repository } from 'typeorm';
import AuthTokensEntity from '@modules/auth/entities/auth.tokens.entity';

@EntityRepository(AuthTokensEntity)
export class AuthTokensRepository extends Repository<AuthTokensEntity> {}
