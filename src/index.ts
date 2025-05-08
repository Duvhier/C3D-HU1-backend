import express from "express";
import "reflect-metadata";
import { AppDataSource } from "./data-sources";
import path from "path";

// Importa tus rutas
import userRoutes from "./routes/userRoutes";
import spaceRoutes from "./routes/spaceRoutes";
import reservationRoutes from "./routes/reservationRoutes";
import bookRoutes from "./routes/bookRoutes";

// Crea instancia de Express
const app = express();

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

// Ruta raíz
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Tus rutas API
app.use("/api/users", userRoutes);
app.use("/api/spaces", spaceRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/books", bookRoutes);

// Inicializa la base de datos solo una vez (evita múltiples llamadas en serverless)
AppDataSource.initialize()
  .then(() => {
    console.log("🚀 Database connected");
  })
  .catch((error) => {
    console.error("❌ Database connection failed:", error);
  });

// Exporta la app para ser usada por Vercel en api/index.ts
export default app;
