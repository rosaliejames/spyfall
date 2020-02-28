import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Timestamp,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import {Location} from './Location';
import {GamePlayer} from './GamePlayer';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(
    () => Location,
    location => location.id,
  )
  location: Location;

  @OneToMany(
    () => GamePlayer,
    player => player.id,
  )
  players: GamePlayer[];

  @Column({type: 'timestamp', nullable: true})
  startedAt: Timestamp | null;

  @Column({type: 'timestamp', nullable: true})
  completedAt: Timestamp | null;

  @Column('timestamp')
  @CreateDateColumn()
  createdAt: Timestamp;

  @Column('timestamp')
  @UpdateDateColumn()
  updatedAt: Timestamp;
}
