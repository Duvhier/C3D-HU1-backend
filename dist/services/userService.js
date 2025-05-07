"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const data_sources_1 = require("../data-sources");
const User_1 = require("../entity/User");
const errorHandler_1 = require("../middlewares/errorHandler");
const userRepo = data_sources_1.AppDataSource.getRepository(User_1.User);
class UserService {
    static async create(userData) {
        try {
            const user = userRepo.create(userData);
            return await userRepo.save(user);
        }
        catch (error) {
            throw new errorHandler_1.AppError("Error creating user", 400);
        }
    }
    static async getAll() {
        try {
            return await userRepo.find();
        }
        catch (error) {
            throw new errorHandler_1.AppError("Error fetching users", 500);
        }
    }
    static async getById(id) {
        try {
            const user = await userRepo.findOneBy({ id });
            if (!user)
                throw new errorHandler_1.AppError("User not found", 404);
            return user;
        }
        catch (error) {
            if (error instanceof errorHandler_1.AppError)
                throw error;
            throw new errorHandler_1.AppError("Error fetching user", 500);
        }
    }
    static async update(id, updateData) {
        try {
            await userRepo.update(id, updateData);
            const updated = await userRepo.findOneBy({ id });
            if (!updated)
                throw new errorHandler_1.AppError("User not found", 404);
            return updated;
        }
        catch (error) {
            if (error instanceof errorHandler_1.AppError)
                throw error;
            throw new errorHandler_1.AppError("Error updating user", 500);
        }
    }
    static async delete(id) {
        try {
            const result = await userRepo.delete(id);
            if (result.affected === 0) {
                throw new errorHandler_1.AppError("User not found", 404);
            }
            return true;
        }
        catch (error) {
            if (error instanceof errorHandler_1.AppError)
                throw error;
            throw new errorHandler_1.AppError("Error deleting user", 500);
        }
    }
}
exports.UserService = UserService;
