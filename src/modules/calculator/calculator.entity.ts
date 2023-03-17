import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity()
@Index(['param1', 'param2', 'result'], { unique: true })
export class Calc {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  param1: number;

  @Column()
  param2: number;

  @Column()
  result: number;

  @Column()
  date_created: Date;

  @Column()
  status: string;

  @Column()
  operation: string;
}
