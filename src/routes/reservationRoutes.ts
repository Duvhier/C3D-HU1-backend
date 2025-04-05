// src/routes/reservationRoutes.ts
import { Router } from "express";
import {
  createReservation,
  getReservations,
  getReservationById,
  updateReservation,
  deleteReservation
} from "../controller/reservationController";

const router = Router();

router.post("/", createReservation);
router.get("/", getReservations);
router.get("/:id", getReservationById);
router.put("/:id", updateReservation);
router.delete("/:id", deleteReservation);

export default router;
