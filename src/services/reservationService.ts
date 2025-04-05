import { AppDataSource } from "../data-sources";
import { Reservation } from "../entity/Reservation";
import { AppError } from "../middlewares/errorHandler";

const reservationRepo = AppDataSource.getRepository(Reservation);

export class ReservationService {
  static async create(reservationData: any) {
    try {
      const reservation = reservationRepo.create(reservationData);
      return await reservationRepo.save(reservation);
    } catch (error) {
      throw new AppError("Error al crear la reserva", 400);
    }
  }

  static async getAll() {
    try {
      return await reservationRepo.find({ relations: ["user", "space"] });
    } catch (error) {
      throw new AppError("Error al obtener reservas", 500);
    }
  }

  static async getById(id: number) {
    try {
      const reservation = await reservationRepo.findOne({
        where: { id },
        relations: ["user", "space"]
      });
      if (!reservation) throw new AppError("Reserva no encontrada", 404);
      return reservation;
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError("Error al buscar reserva", 500);
    }
  }

  static async update(id: number, updateData: any) {
    try {
      await reservationRepo.update(id, updateData);
      const updated = await reservationRepo.findOne({ where: { id } });
      if (!updated) throw new AppError("Reserva no encontrada", 404);
      return updated;
    } catch (error) {
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
      return true;
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError("Error al eliminar reserva", 500);
    }
  }
}
