"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const data_sources_1 = require("./data-sources");
const path_1 = __importDefault(require("path"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const spaceRoutes_1 = __importDefault(require("./routes/spaceRoutes"));
const reservationRoutes_1 = __importDefault(require("./routes/reservationRoutes"));
const bookRoutes_1 = __importDefault(require("./routes/bookRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../public/index.html"));
});
app.use("/api/users", userRoutes_1.default);
app.use("/api/spaces", spaceRoutes_1.default);
app.use("/api/reservations", reservationRoutes_1.default);
app.use("/api/books", bookRoutes_1.default);
data_sources_1.AppDataSource.initialize().then(() => {
    console.log("🚀 Database connected");
});
exports.default = app; // Exporta la aplicación para Vercel
