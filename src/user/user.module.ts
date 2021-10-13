import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/User';
import { Test } from '../entities/Test';

@Module({
  imports: [TypeOrmModule.forFeature([User, Test])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
