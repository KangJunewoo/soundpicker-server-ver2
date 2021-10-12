import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Test } from './Test';

@Entity('User', { schema: 'soundpicker_test' })
export class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'email', length: 50 })
  email: string;

  @Column('varchar', { name: 'password', length: 200 })
  password: string;

  @Column('varchar', { name: 'nickname', length: 50 })
  nickname: string;

  @Column('varchar', { name: 'salt', length: 200 })
  salt: string;

  @OneToMany(() => Test, (test) => test.user)
  tests: Test[];
}
