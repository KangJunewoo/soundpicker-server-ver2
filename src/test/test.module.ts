import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test } from '../entities/Test';
import { User } from '../entities/User';
import { MongooseModule } from '@nestjs/mongoose';
import { Log, LogSchema } from '../entities/Log';
import { Question } from '../entities/Question';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Test, Question]),
    MongooseModule.forFeature([{ name: Log.name, schema: LogSchema }]),
  ],
  providers: [TestService],
  controllers: [TestController],
})
export class TestModule {}
