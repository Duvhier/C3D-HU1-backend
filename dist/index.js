"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const data_sources_1 = require("./data-sources");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const spaceRoutes_1 = __importDefault(require("./routes/spaceRoutes"));
const reservationRoutes_1 = __importDefault(require("./routes/reservationRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/users", userRoutes_1.default);
app.use("/api/spaces", spaceRoutes_1.default);
app.use("/api/reservations", reservationRoutes_1.default);
data_sources_1.AppDataSource.initialize().then(() => {
    app.listen(3000, () => {
        console.log("🚀 Server running on http://localhost:3000");
    });
});
