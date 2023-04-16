import dotenvExtended from 'dotenv-extended';
import * as dotenvParseVariables from 'dotenv-parse-variables';
import * as path from 'path';

const env = dotenvExtended.load({
  path: process.env.ENV_FILE,
  defaults: path.resolve(__dirname, '../../.env'),
  schema: path.resolve(__dirname, '../../.env'),
  includeProcessEnv: true,
  silent: false,
  errorOnMissing: true,
  errorOnExtra: true,
});

const parsedEnv = dotenvParseVariables(env);

// Define log levels type (silent + Winston default npm)
type LogLevel =
  | 'silent'
  | 'error'
  | 'warn'
  | 'info'
  | 'http'
  | 'verbose'
  | 'debug'
  | 'silly';

export interface Config {
  appName: string;
  appPort: number;
  privateKeyFile: string;
  privateKeyPassphrase: string;
  publicKeyFile: string;

  localCacheTtl: number;

  redisUrl: string;

  JWTTokenSecret: string;
  JWTExpiredTime: number;

  mongo: {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
    useCreateIndex: boolean;
    autoIndex: boolean;
    debug: boolean;
  };

  pg: {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
  };

  morganLogger: boolean;
  morganBodyLogger: boolean;
  loggerLevel: LogLevel;
}

const config: Config = {
  appName: parsedEnv.APP_NAME as string,
  appPort: parsedEnv.APP_PORT as number,
  privateKeyFile: parsedEnv.PRIVATE_KEY_FILE as string,
  privateKeyPassphrase: parsedEnv.PRIVATE_KEY_PASSPHRASE as string,
  publicKeyFile: parsedEnv.PUBLIC_KEY_FILE as string,
  JWTTokenSecret: parsedEnv.WEBTOKEN_SECRET_KEY as string,
  JWTExpiredTime: parsedEnv.EXPIRATION_TIME as number,

  localCacheTtl: parsedEnv.LOCAL_CACHE_TTL as number,

  redisUrl: parsedEnv.REDIS_URL as string,

  mongo: {
    host: parsedEnv.MONGO_HOST as string,
    port: parsedEnv.MONGO_PORT as number,
    user: parsedEnv.MONGO_USERNAME as string,
    password: parsedEnv.MONGO_PASSWORD as string,
    database: parsedEnv.MONGO_DATABASE as string,
    useCreateIndex: parsedEnv.MONGO_CREATE_INDEX as boolean,
    autoIndex: parsedEnv.MONGO_AUTO_INDEX as boolean,
    debug: parsedEnv.MONGO_DEBUG as boolean,
  },

  pg: {
    host: parsedEnv.PG_HOST as string,
    port: parsedEnv.PG_PORT as number,
    user: parsedEnv.PG_USERNAME as string,
    password: parsedEnv.PG_PASSWORD as string,
    database: parsedEnv.PG_NAME as string,
  },

  morganLogger: parsedEnv.MORGAN_LOGGER as boolean,
  morganBodyLogger: parsedEnv.MORGAN_BODY_LOGGER as boolean,
  loggerLevel: parsedEnv.LOGGER_LEVEL as LogLevel,
};

export default config;
