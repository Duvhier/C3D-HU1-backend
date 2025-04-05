// src/controller/reservationController.ts
import { Request, Response } from "express";
import { AppDataSource } from "../data-sources";
import { Reservation } from "../entity/Reservation";

const reservationRepo = AppDataSource.getRepository(Reservation);

// Crear una reserva
export const createReservation = async (req: Request, res: Response) => {
  try {
    const reservation = reservationRepo.create(req.body);
    const result = await reservationRepo.save(reservation);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la reserva", error });
  }
};

// Obtener todas las reservas
export const getReservations = async (_: Request, res: Response) => {
  try {
    const reservations = await reservationRepo.find({ relations: ["user", "space"] });
    res.json(reservations);
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
    reservation ? res.json(reservation) : res.status(404).json({ message: "Reserva no encontrada" });
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
