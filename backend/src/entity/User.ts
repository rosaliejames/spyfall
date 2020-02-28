import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Timestamp,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;

  @Column('timestamp')
  @CreateDateColumn()
  createdAt: Timestamp;

  @Column('timestamp')
  @UpdateDateColumn()
  updatedAt: Timestamp;
}
