// src/entity/Reservation.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { User } from "./User";
import { Space } from "./Space";

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.reservations)
  user: User;

  @ManyToOne(() => Space, space => space.reservations)
  space: Space;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  @CreateDateColumn()
  createdAt: Date;
}
