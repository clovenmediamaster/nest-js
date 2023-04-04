import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity()
@Index(['email'], { unique: true })
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false, default: 'user' })
  role: string;

  @Column({ nullable: true })
  userName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: false })
  password: string;
}
