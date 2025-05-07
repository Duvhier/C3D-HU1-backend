"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationService = void 0;
const data_sources_1 = require("../data-sources");
const Reservation_1 = require("../entity/Reservation");
const errorHandler_1 = require("../middlewares/errorHandler");
const reservationRepo = data_sources_1.AppDataSource.getRepository(Reservation_1.Reservation);
class ReservationService {
    static async create(reservationData) {
        try {
            const reservation = reservationRepo.create(reservationData);
            return await reservationRepo.save(reservation);
        }
        catch (error) {
            throw new errorHandler_1.AppError("Error al crear la reserva", 400);
        }
    }
    static async getAll() {
        try {
            return await reservationRepo.find({ relations: ["user", "space"] });
        }
        catch (error) {
            throw new errorHandler_1.AppError("Error al obtener reservas", 500);
        }
    }
    static async getById(id) {
        try {
            const reservation = await reservationRepo.findOne({
                where: { id },
                relations: ["user", "space"]
            });
            if (!reservation)
                throw new errorHandler_1.AppError("Reserva no encontrada", 404);
            return reservation;
        }
        catch (error) {
            if (error instanceof errorHandler_1.AppError)
                throw error;
            throw new errorHandler_1.AppError("Error al buscar reserva", 500);
        }
    }
    static async update(id, updateData) {
        try {
            await reservationRepo.update(id, updateData);
            const updated = await reservationRepo.findOne({ where: { id } });
            if (!updated)
                throw new errorHandler_1.AppError("Reserva no encontrada", 404);
            return updated;
        }
        catch (error) {
            if (error instanceof errorHandler_1.AppError)
                throw error;
            throw new errorHandler_1.AppError("Error al actualizar reserva", 500);
        }
    }
    static async delete(id) {
        try {
            const result = await reservationRepo.delete(id);
            if (result.affected === 0) {
                throw new errorHandler_1.AppError("Reserva no encontrada", 404);
            }
            return true;
        }
        catch (error) {
            if (error instanceof errorHandler_1.AppError)
                throw error;
            throw new errorHandler_1.AppError("Error al eliminar reserva", 500);
        }
    }
}
exports.ReservationService = ReservationService;
