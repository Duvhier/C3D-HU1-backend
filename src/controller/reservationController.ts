// src/controller/reservationController.ts
import { Request, Response } from "express";
import { AppDataSource } from "../data-sources";
import { Reservation } from "../entity/Reservation";
import { User } from "../entity/User";
import { Space } from "../entity/Space";

const reservationRepo = AppDataSource.getRepository(Reservation);

// Crear una reserva
export const createReservation = async (req: Request, res: Response) => {
  try {
    const { userId, spaceId, startTime, endTime } = req.body;

    const userRepo = AppDataSource.getRepository(User);
    const spaceRepo = AppDataSource.getRepository(Space);

    const user = await userRepo.findOneBy({ id: userId });
    const space = await spaceRepo.findOneBy({ id: spaceId });

    if (!user || !space) {
      return res.status(404).json({ message: "Usuario o espacio no encontrado" });
    }

    const reservation = reservationRepo.create({
      user,
      space,
      startTime,
      endTime
    });

const saved = await reservationRepo.save(reservation);

res.status(201).json({
  id: saved.id,
  user: user.fullName,
  space: space.name,
  startTime: saved.startTime,
  endTime: saved.endTime,
  createdAt: saved.createdAt
});

  } catch (error) {
    res.status(500).json({ message: "Error al crear la reserva", error });
  }
};

// Obtener todas las reservas
export const getReservations = async (_: Request, res: Response) => {
  try {
    const reservations = await reservationRepo.find({ relations: ["user", "space"] });

    const simplified = reservations.map(reservation => ({
      id: reservation.id,
      user: reservation.user.fullName,
      space: reservation.space.name,
      startTime: reservation.startTime,
      endTime: reservation.endTime,
      createdAt: reservation.createdAt
    }));

    res.json(simplified);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener reservas", error });
  }
};

// Obtener una reserva por ID
export const getReservationById = async (req: Request, res: Response) => {
  try {
    const reservation = await reservationRepo.findOne({
      where: { id: Number(req.params.id) },
      relations: ["user", "space"]
    });

    if (!reservation) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }

    const simplified = {
      id: reservation.id,
      user: reservation.user.fullName,
      space: reservation.space.name,
      startTime: reservation.startTime,
      endTime: reservation.endTime,
      createdAt: reservation.createdAt
    };

    res.json(simplified);
  } catch (error) {
    res.status(500).json({ message: "Error al buscar reserva", error });
  }
};

// Actualizar una reserva
export const updateReservation = async (req: Request, res: Response) => {
  try {
    await reservationRepo.update(req.params.id, req.body);
    const updated = await reservationRepo.findOne({ where: { id: Number(req.params.id) } });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar reserva", error });
  }
};

// Eliminar una reserva
export const deleteReservation = async (req: Request, res: Response) => {
  try {
    const result = await reservationRepo.delete(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar reserva", error });
  }
};

export const deleteAllReservations = async (_: Request, res: Response) => {
  try {
    await reservationRepo.clear(); // elimina todos los registros
    res.json({ message: "Todas las reservas han sido eliminadas." });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar reservas", error });
  }
};
