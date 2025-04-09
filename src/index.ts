// src/index.ts
import express from "express";
import "reflect-metadata";
import { AppDataSource } from "./data-sources";

import userRoutes from "./routes/userRoutes";
import spaceRoutes from "./routes/spaceRoutes";
import reservationRoutes from "./routes/reservationRoutes";

const app = express();
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/spaces", spaceRoutes);
app.use("/api/reservations", reservationRoutes);

AppDataSource.initialize().then(() => {
  app.listen(3000, '0.0.0.0', () => {
    console.log("🚀 Server running on http://localhost:3000");
  });
});
