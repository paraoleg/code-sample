import * as Joi from 'joi';
import ConfigSchema from './config.schema';

export type SchemaKey = keyof typeof ConfigSchema;

export const validationSchema = Joi.object(ConfigSchema);

export const validationOptions = {
  allowUnknown: true,
  abortEarly: true,
};

/**
 * @description Validate sync
 */
export const validateSync = (
  data: Record<string, string>,
): Record<string, any> => {
  const { error, value } = validationSchema.validate(data, validationOptions);
  if (error) {
    global.console.error(error);
    throw new Error(error.message);
  }
  return value;
};
