import 'dotenv/config';
import * as joi from 'joi';

interface IEnvironment {
  PORT: number;
  MONGODB_URL: string;
}

const environmentSchema = joi
  .object({
    PORT: joi.number().default(3000),
    MONGODB_URL: joi.string().required(),
  })
  .unknown(true);

const { error, value } = environmentSchema.validate(process.env);

if (error) {
  throw new Error(
    `Config validation error: ${error.message} for environment not configured`,
  );
}

const environmentVariable: IEnvironment = value;

export const environment = {
  port: environmentVariable.PORT,
  mongodbUrl: environmentVariable.MONGODB_URL,
};
