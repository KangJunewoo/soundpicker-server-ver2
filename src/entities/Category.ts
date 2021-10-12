import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Test } from './Test';

@Entity('Category', { schema: 'soundpicker_test' })
export class Category {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'thumbnailUrl', nullable: true, length: 512 })
  thumbnailUrl: string | null;

  @Column('varchar', { name: 'description', length: 200 })
  description: string;

  @OneToMany(() => Test, (test) => test.category)
  tests: Test[];
}
