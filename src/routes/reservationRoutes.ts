// src/routes/reservationRoutes.ts
import { Router } from "express";
import {
  createReservation,
  getReservations,
  getReservationById,
  updateReservation,
  deleteReservation,
  deleteAllReservations
} from "../controller/reservationController";

const router = Router();

router.post("/", createReservation);
router.get("/", getReservations);
router.get("/:id", getReservationById);
router.put("/:id", updateReservation);
router.delete("/:id", deleteReservation);
router.delete("/all", deleteAllReservations);

export default router;
