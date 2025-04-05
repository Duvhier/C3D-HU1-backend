// src/entity/Space.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Reservation } from "./Reservation";

@Entity()
export class Space {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: 'classroom' | 'lab' | 'auditorium';

  @Column()
  capacity: number;

  @OneToMany(() => Reservation, reservation => reservation.space)
  reservations: Reservation[];
}
