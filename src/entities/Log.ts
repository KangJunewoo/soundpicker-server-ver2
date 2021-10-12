import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Log', { schema: 'soundpicker_test' })
export class Log {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('tinyint', { name: 'type', width: 1 })
  type: boolean;

  @Column('datetime', { name: 'createdAt' })
  createdAt: Date;

  @Column('datetime', { name: 'updatedAt' })
  updatedAt: Date;
}
