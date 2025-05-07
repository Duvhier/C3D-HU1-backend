"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reservation = void 0;
// src/entity/Reservation.ts
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Space_1 = require("./Space");
let Reservation = class Reservation {
    id;
    user;
    space;
    startTime;
    endTime;
    createdAt;
};
exports.Reservation = Reservation;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Reservation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, user => user.reservations),
    __metadata("design:type", User_1.User)
], Reservation.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Space_1.Space, space => space.reservations),
    __metadata("design:type", Space_1.Space)
], Reservation.prototype, "space", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Reservation.prototype, "startTime", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Reservation.prototype, "endTime", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Reservation.prototype, "createdAt", void 0);
exports.Reservation = Reservation = __decorate([
    (0, typeorm_1.Entity)()
], Reservation);
