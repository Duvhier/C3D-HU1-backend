"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReservation = exports.updateReservation = exports.getReservationById = exports.getReservations = exports.createReservation = void 0;
const data_sources_1 = require("../data-sources");
const Reservation_1 = require("../entity/Reservation");
const User_1 = require("../entity/User");
const Space_1 = require("../entity/Space");
const reservationRepo = data_sources_1.AppDataSource.getRepository(Reservation_1.Reservation);
// Crear una reserva
const createReservation = async (req, res) => {
    try {
        const { userId, spaceId, startTime, endTime } = req.body;
        const userRepo = data_sources_1.AppDataSource.getRepository(User_1.User);
        const spaceRepo = data_sources_1.AppDataSource.getRepository(Space_1.Space);
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
        const result = await reservationRepo.save(reservation);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(500).json({ message: "Error al crear la reserva", error });
    }
};
exports.createReservation = createReservation;
// Obtener todas las reservas
const getReservations = async (_, res) => {
    try {
        const reservations = await reservationRepo.find({ relations: ["user", "space"] });
        res.json(reservations);
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener reservas", error });
    }
};
exports.getReservations = getReservations;
// Obtener una reserva por ID
const getReservationById = async (req, res) => {
    try {
        const reservation = await reservationRepo.findOne({
            where: { id: Number(req.params.id) },
            relations: ["user", "space"]
        });
        reservation ? res.json(reservation) : res.status(404).json({ message: "Reserva no encontrada" });
    }
    catch (error) {
        res.status(500).json({ message: "Error al buscar reserva", error });
    }
};
exports.getReservationById = getReservationById;
// Actualizar una reserva
const updateReservation = async (req, res) => {
    try {
        await reservationRepo.update(req.params.id, req.body);
        const updated = await reservationRepo.findOne({ where: { id: Number(req.params.id) } });
        res.json(updated);
    }
    catch (error) {
        res.status(500).json({ message: "Error al actualizar reserva", error });
    }
};
exports.updateReservation = updateReservation;
// Eliminar una reserva
const deleteReservation = async (req, res) => {
    try {
        const result = await reservationRepo.delete(req.params.id);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: "Error al eliminar reserva", error });
    }
};
exports.deleteReservation = deleteReservation;
