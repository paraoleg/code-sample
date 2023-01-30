import * as path from 'path';
import { ConnectionOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';

const getConfig = (
  configService: ConfigService,
): ConnectionOptions & { seeds: string[]; factories: string[] } => ({
  name: 'default',
  type: 'mysql',
  host: configService.get<string>('MYSQL_HOST'),
  port: parseInt(configService.get<string>('MYSQL_PORT')),
  username: configService.get<string>('MYSQL_USER'),
  password: configService.get<string>('MYSQL_PASSWORD'),
  database: configService.get<string>('MYSQL_DATABASE'),
  // We are using migrations, synchronize should be set to false.
  synchronize: false,
  // This option will log all queries which run more then 3 second.
  maxQueryExecutionTime: 3000,
  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  migrationsRun: configService.get<boolean>('ORM_MIGRATIONS_RUN'),
  logging: configService.get<boolean>('ORM_LOGGING'),
  logger: configService.get<
    'advanced-console' | 'simple-console' | 'file' | 'debug'
  >('ORM_LOGGER'),
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
});

export = getConfig;
