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

  @Column()
  userName: string;

  @Column()
  lastName: string;

  // @Column()
  // address: string;

  // @Column()
  // city: string;

  // @Column()
  // country: string;

  // @Column()
  // postalCode: string;

  // @Column()
  // about: string;

  @Column({ nullable: false })
  password: string;
}
