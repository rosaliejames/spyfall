import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  Timestamp,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import {Location} from './Location';
import {Game} from './Game';
import {Role} from './Role';
import {User} from './User';

@Entity()
export class GamePlayer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => User,
    user => user.id,
  )
  user: User;

  @ManyToOne(
    () => Game,
    game => game.id,
  )
  game: Game;

  @ManyToOne(
    () => Role,
    role => role.id,
  )
  role: Role;

  @Column({type: 'timestamp', nullable: true})
  archivedAt: Timestamp | null;

  @Column('timestamp')
  @CreateDateColumn()
  createdAt: Timestamp;

  @Column('timestamp')
  @UpdateDateColumn()
  updatedAt: Timestamp;
}
