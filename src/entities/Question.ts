import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Test } from './Test';

@Index('TestId', ['testId'], {})
@Entity('Question', { schema: 'soundpicker_test' })
export class Question {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'hint', nullable: true, length: 50 })
  hint: string | null;

  @Column('varchar', { name: 'answer', length: 200 })
  answer: string;

  @Column('varchar', { name: 'thumbnail', nullable: true, length: 512 })
  thumbnail: string | null;

  @Column('varchar', { name: 'questionYoutubeURL', length: 512 })
  questionYoutubeUrl: string;

  @Column('int', { name: 'questionStartsfrom' })
  questionStartsfrom: number;

  @Column('varchar', { name: 'sound1URL', length: 512 })
  sound1Url: string;

  @Column('varchar', { name: 'sound3URL', length: 512 })
  sound3Url: string;

  @Column('varchar', { name: 'answerYoutubeURL', length: 512 })
  answerYoutubeUrl: string;

  @Column('int', { name: 'TestId', nullable: true })
  testId: number | null;

  @Column('int', { name: 'questionNumber' })
  questionNumber: number;

  @ManyToOne(() => Test, (test) => test.questions, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'TestId', referencedColumnName: 'id' }])
  test: Test;
}
