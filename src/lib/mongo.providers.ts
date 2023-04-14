import config from '../config';
import * as mongoose from 'mongoose';

const uri = `mongodb://${config.mongo.host}:${config.mongo.port}/${config.mongo.database}?authSource=admin`;

export const mongoProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(uri, {
        user: config.mongo.user,
        pass: config.mongo.password,
      }),
  },
];
