import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Timestamp,
} from 'typeorm';
import {Location} from './Location';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;

  @ManyToOne(
    () => Location,
    location => location.roles,
  )
  location: Location;

  @Column('timestamp')
  @CreateDateColumn()
  createdAt: Timestamp;

  @Column('timestamp')
  @UpdateDateColumn()
  updatedAt: Timestamp;
}
