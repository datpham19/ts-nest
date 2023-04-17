import { parse } from 'dotenv';
import * as joi from '@hapi/joi';
import * as fs from 'fs';
import * as path from 'path'; 
/**
 * Key-value mapping
 */
export interface EnvConfig {
  [key: string]: string;
}

/**
 * Config Service
 */
export class ConfigService {
  /**
   * Object that will contain the injected environment variables
   */
  private readonly envConfig: EnvConfig;

  /**
   * Constructor
   * @param {string} filePath
   */
  constructor(filePath: string) {
    const config = parse(fs.readFileSync(filePath || path.resolve(__dirname, '../../.env')));
    this.envConfig = ConfigService.validateInput(config);
  }

  /**
   * Ensures all needed variables are set, and returns the validated JavaScript object
   * including the applied default values.
   * @param {EnvConfig} envConfig the configuration object with variables from the configuration file
   * @returns {EnvConfig} a validated environment configuration object
   */
  private static validateInput(envConfig: EnvConfig): EnvConfig {
    /**
     * A schema to validate envConfig against
     */
    const envVarsSchema: joi.ObjectSchema = joi.object({
      APP_NAME: joi.string().required(),
      APP_SCHEMA: joi.string().required(),
      APP_HOST: joi.string().required(),
      APP_PORT: joi.string().required(),
      APP_BANNER: joi.string().required(),
      APP_ENV: joi.string().required(),
      MONGO_HOST: joi.string().required(),
      MONGO_PORT: joi.string().required(),
      MONGO_USERNAME: joi.string().required(),
      MONGO_PASSWORD: joi.string().required(),
      MONGO_DATABASE: joi.string().required(),
      MONGO_DEBUG: joi.string().required(),
      PG_HOST: joi.string().required(),
      PG_PORT: joi.string().required(),
      PG_USERNAME: joi.string().required(),
      PG_PASSWORD: joi.string().required(),
      PG_DATABASE: joi.string().required(),
      REDIS_HOST: joi.string().required(),
      REDIS_PORT: joi.number().required(),
      REDIS_PASSWORD: joi.string().required(),
      REDIS_USERNAME: joi.string().required(),
      REDIS_DB: joi.string().required(),
      LOG_LEVEL: joi.string().required(),
      LOG_OUTPUT: joi.string().required(),
      LOGGER_LEVEL: joi
        .string()
        .valid(
          'silent',
          'error',
          'warn',
          'info',
          'http',
          'verbose',
          'debug',
          'silly',
        )
        .default('info'),
      WEBTOKEN_SECRET_KEY: joi.string().required(),
      WEBTOKEN_EXPIRATION_TIME: joi.number().default(1800),
    });

    /**
     * Represents the status of validation check on the configuration file
     */
    const { error, value: validatedEnvConfig } =
      envVarsSchema.validate(envConfig);
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }

  /**
   * Fetches the key from the configuration file
   * @param {string} key
   * @returns {string} the associated value for a given key
   */
  get(key: string): string {
    return this.envConfig[key];
  }

  /**
   * Checks whether the application environment set in the configuration file matches the environment parameter
   * @param {string} env
   * @returns {boolean} Whether or not the environment variable matches the application environment
   */
  isEnv(env: string): boolean {
    return this.envConfig.APP_ENV === env;
  }
}
