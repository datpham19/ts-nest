import { Model, DataTypes, Sequelize } from 'sequelize';
import config from '../config';

export const pgProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: config.pg.host,
        port: config.pg.port,
        username: config.pg.user,
        password: config.pg.password,
        database: config.pg.database,
      });
      return sequelize;
    },
  },
];