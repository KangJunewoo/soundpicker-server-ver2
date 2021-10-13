import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Test } from './Test';
import { ApiProperty } from '@nestjs/swagger';

@Entity('User', { schema: 'soundpicker_test' })
export class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ApiProperty({
    example: 'user@example.com',
    description: '사용자 이메일',
    required: true
  })
  @Column('varchar', { name: 'email', length: 50 })
  email: string;

  @ApiProperty({
    example: 'test123',
    description: '사용자 비밀번호',
    required: true
  })
  @Column('varchar', { name: 'password', length: 200 })
  password: string;

  @ApiProperty({
    required: true,
    example: '카초',
    description: '사용자 닉네임',
  })
  @Column('varchar', { name: 'nickname', length: 50 })
  nickname: string;


  @Column('varchar', { name: 'salt', length: 200 })
  salt: string;

  @OneToMany(() => Test, (test) => test.user)
  tests: Test[];
}
