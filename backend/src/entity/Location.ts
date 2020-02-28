import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  UpdateDateColumn,
  CreateDateColumn,
  Timestamp,
} from 'typeorm';
import {Role} from './Role';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;

  @OneToMany(
    () => Role,
    role => role.location,
  )
  roles: Role[];

  @Column('timestamp')
  @CreateDateColumn()
  createdAt: Timestamp;

  @Column('timestamp')
  @UpdateDateColumn()
  updatedAt: Timestamp;
}
