"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./entity/User");
const Space_1 = require("./entity/Space");
const Reservation_1 = require("./entity/Reservation");
const Notification_1 = require("./entity/Notification");
const Book_1 = require("./entity/Book");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: false,
    entities: [User_1.User, Space_1.Space, Reservation_1.Reservation, Notification_1.Notification, Book_1.Book],
    migrations: [],
    subscribers: [],
});
