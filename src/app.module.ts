import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestModule } from './test/test.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormconfig from '../ormconfig';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TestModule,
    UserModule,
    TypeOrmModule.forRoot(ormconfig),
    MongooseModule.forRoot(process.env.MONGO_HOST),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
