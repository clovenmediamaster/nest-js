import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
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
}
