import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Question } from './Question';
import { Category } from './Category';
import { User } from './User';

@Index('CategoryId', ['categoryId'], {})
@Index('UserId', ['userId'], {})
@Entity('Test', { schema: 'soundpicker_test' })
export class Test {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'title', length: 50 })
  title: string;

  @Column('varchar', { name: 'description', length: 200 })
  description: string;

  @Column('int', { name: 'questionCount' })
  questionCount: number;

  @Column('int', { name: 'visitCount', default: () => "'0'" })
  visitCount: number;

  @Column('int', { name: 'CategoryId', nullable: true })
  categoryId: number | null;

  @Column('int', { name: 'UserId', nullable: true })
  userId: number | null;

  @Column('tinyint', { name: 'hidden', width: 1, default: () => "'0'" })
  hidden: boolean;

  @Column('tinyint', { name: 'generated', width: 1, default: () => "'0'" })
  generated: boolean;

  @Column('int', { name: 'finishCount', default: () => "'0'" })
  finishCount: number;

  @OneToMany(() => Question, (question) => question.test)
  questions: Question[];

  @ManyToOne(() => Category, (category) => category.tests, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'CategoryId', referencedColumnName: 'id' }])
  category: Category;

  @ManyToOne(() => User, (user) => user.tests, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'UserId', referencedColumnName: 'id' }])
  user: User;
}
