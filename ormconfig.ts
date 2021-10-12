//[
//  {
//    "name": "default",
//    "type": "mysql",
//    "host": "soundpicker-db.ckxjgesoea8z.ap-northeast-2.rds.amazonaws.com",
//    "port": 3306,
//    "username": "admin",
//    "password": "tkdnsemvlzj12*",
//    "database": "",
//    "synchronize": false,
//    "entities": ["entities/*.js"]
//  }
//]

import * as dotenv from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Category } from './src/entities/Category';
import { User } from './src/entities/User';
import { Question } from './src/entities/Question';
import { Log } from './src/entities/Log';
import { Test } from './src/entities/Test';

dotenv.config();
const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Category, Log, Question, Test, User],
  migrations: [__dirname + '/src/migrations/*.ts'],
  cli: { migrationsDir: 'src/migrations' },
  autoLoadEntities: true,
  charset: 'utf8mb4',
  synchronize: false,
  logging: true,
  keepConnectionAlive: true, // 이거 안켜두면 핫리로딩때마다 db연결 끊김
};

export = config;