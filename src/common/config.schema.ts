import * as Joi from 'joi';

export default {
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'test-local', 'provision')
    .default('development'),
  PORT: Joi.number().default(3000),
  ORM_LOGGING: Joi.boolean().default(true),
  ORM_LOGGER: Joi.string()
    .valid('advanced-console', 'simple-console', 'file', 'debug')
    .default('advanced-console'),
  ORM_MIGRATIONS_RUN: Joi.boolean().default(true),
  MYSQL_ROOT_PASSWORD: Joi.string().required(),
  MYSQL_USER: Joi.string().required(),
  MYSQL_PASSWORD: Joi.string().required(),
  MYSQL_DATABASE: Joi.string().required(),
  MYSQL_ROOT_HOST: Joi.string().required(),
  MYSQL_HOST: Joi.string().required(),
  MYSQL_PORT: Joi.string().optional().default('3306'),
  HEALTH_CHECK_SECRET: Joi.string().required(),
  BASE_PATH: Joi.string().optional(),
  LOGGING_TO_FILE: Joi.boolean().default(false),
  JWT_SECRET: Joi.string().required(),
  JWT_TTL: Joi.number().default(3600),
};
