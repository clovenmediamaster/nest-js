import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity()
export class Calc {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  param1: number;

  @Column()
  param2: number;

  @Index({ unique: true })
  @Column()
  result: number;

  @Column()
  date_created: Date;

  @Column()
  status: string;
}
