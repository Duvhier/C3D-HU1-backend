// src/entity/User.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Reservation } from "./Reservation";
import { Notification } from "./Notification";

export type Role = 'student' | 'professor' | 'admin';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  role: Role;

  @OneToMany(() => Reservation, reservation => reservation.user)
  reservations: Reservation[];

  @OneToMany(() => Notification, notification => notification.user)
  notifications: Notification[];
}
