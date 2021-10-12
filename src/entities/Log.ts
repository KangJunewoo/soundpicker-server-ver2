import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { IsBoolean, IsDate, IsNotEmpty, IsNumber } from 'class-validator';

@Entity('Log', { schema: 'soundpicker_test' })
export class Log {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('tinyint', { name: 'type', width: 1 })
  type: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
