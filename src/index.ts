import express from "express";
import "reflect-metadata";
import { AppDataSource } from "./data-sources";
import path from "path";

import userRoutes from "./routes/userRoutes";
import spaceRoutes from "./routes/spaceRoutes";
import reservationRoutes from "./routes/reservationRoutes";
import bookRoutes from "./routes/bookRoutes";

const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, "../public")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});
app.use("/api/users", userRoutes);
app.use("/api/spaces", spaceRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/books", bookRoutes);

AppDataSource.initialize().then(() => {
  console.log("🚀 Database connected");
});

export default app; // Exporta la aplicación para Vercel