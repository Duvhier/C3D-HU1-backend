import { AppDataSource } from "../data-sources";
import { Reservation } from "../entity/Reservation";
import { AppError } from "../middlewares/errorHandler";

const reservationRepo = AppDataSource.getRepository(Reservation);

export class ReservationService {
  static async create(reservationData: Partial<Reservation>) {
    try {
      const reservation = reservationRepo.create(reservationData);
      return await reservationRepo.save(reservation);
    } catch (error) {
      console.error("Error al crear la reserva:", error);
      throw new AppError("Error al crear la reserva", 400);
    }
  }

  static async getAll() {
    try {
      return await reservationRepo.find({
        relations: ["user", "space"],
        order: { id: "ASC" } // Opcional: ordenar resultados
      });
    } catch (error) {
      console.error("Error al obtener todas las reservas:", error);
      throw new AppError("Error al obtener reservas", 500);
    }
  }

  static async getById(id: number) {
    try {
      const reservation = await reservationRepo.findOne({
        where: { id },
        relations: ["user", "space"]
      });
      if (!reservation) {
        throw new AppError("Reserva no encontrada", 404);
      }
      return reservation;
    } catch (error) {
      console.error(`Error al buscar reserva con ID ${id}:`, error);
      if (error instanceof AppError) throw error;
      throw new AppError("Error al buscar reserva", 500);
    }
  }

  static async update(id: number, updateData: Partial<Reservation>) {
    try {
      const updateResult = await reservationRepo.update(id, updateData);
      if (updateResult.affected === 0) {
        throw new AppError("Reserva no encontrada para actualizar", 404);
      }
      const updated = await reservationRepo.findOne({ where: { id } });
      return updated;
    } catch (error) {
      console.error(`Error al actualizar la reserva con ID ${id}:`, error);
      if (error instanceof AppError) throw error;
      throw new AppError("Error al actualizar reserva", 500);
    }
  }

  static async delete(id: number) {
    try {
      const result = await reservationRepo.delete(id);
      if (result.affected === 0) {
        throw new AppError("Reserva no encontrada", 404);
      }
      return { message: "Reserva eliminada correctamente" };
    } catch (error) {
      console.error(`Error al eliminar reserva con ID ${id}:`, error);
      if (error instanceof AppError) throw error;
      throw new AppError("Error al eliminar reserva", 500);
    }
  }
}
