import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { ConnectionOptions } from 'typeorm';
import { validateSync, SchemaKey } from '@common/config.validation';
import { ENVIRONMENTS } from '@common/constants';

// This is because when we run the typeorm:cli command.
// Typeorm lib calls dotenv config and takes .env file
// https://github.com/typeorm/typeorm/pull/6922/files#diff-4a32367b1da949cdaee76c0fa784e7fa5aa1ed4aac1670ff8575d7b58e8e84d0R102
const envData =
  process.env.NODE_ENV === ENVIRONMENTS.TEST_LOCAL
    ? Object.assign(
        process.env,
        dotenv.parse(
          fs.readFileSync(path.join(process.cwd(), '.env.local.test')),
        ),
      )
    : null;

const validatedData = validateSync(envData || process.env);
function get<T>(key: SchemaKey): T {
  return validatedData[key];
}

const config: ConnectionOptions & { seeds: string[]; factories: string[] } = {
  name: 'default',
  type: 'mysql',
  host: get<string>('MYSQL_HOST'),
  port: parseInt(get<string>('MYSQL_PORT')),
  username: get<string>('MYSQL_USER'),
  password: get<string>('MYSQL_PASSWORD'),
  database: get<string>('MYSQL_DATABASE'),
  // We are using migrations, synchronize should be set to false.
  synchronize: false,
  // This option will log all queries which run more then 3 second.
  maxQueryExecutionTime: 3000,
  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  migrationsRun: get<boolean>('ORM_MIGRATIONS_RUN'),
  logging: get<boolean>('ORM_LOGGING'),
  logger: get<'advanced-console' | 'simple-console' | 'file' | 'debug'>(
    'ORM_LOGGER',
  ),
  supportBigNumbers: true,
  bigNumberStrings: false,
  entities: [path.join(__dirname, '../', '/**/*.entity{.js,.ts}')],
  migrations: [path.join(__dirname, '/migrations/**/*{.ts,.js}')],
  subscribers: [path.join(__dirname, '/subscribers/**/*{.ts,.js}')],
  seeds: [path.join(__dirname, '/seeds/**/*{.ts,.js}')],
  factories: [path.join(__dirname, '/factories/**/*{.ts,.js}')],
  cli: {
    // Location of migration should be inside src folder
    // to be compiled into dist/ folder.
    entitiesDir: 'src',
    migrationsDir: 'src/database/migrations',
    subscribersDir: 'src/database/subscribers',
  },
};

export = config;
