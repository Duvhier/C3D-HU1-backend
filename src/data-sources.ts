
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Space } from "./entity/Space";
import { Reservation } from "./entity/Reservation";
import { Notification } from "./entity/Notification";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: false,
    entities: [User, Space, Reservation, Notification],
    migrations: [],
    subscribers: [],
});