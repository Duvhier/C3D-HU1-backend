"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpaceService = void 0;
const data_sources_1 = require("../data-sources");
const Space_1 = require("../entity/Space");
const errorHandler_1 = require("../middlewares/errorHandler");
const spaceRepo = data_sources_1.AppDataSource.getRepository(Space_1.Space);
class SpaceService {
    static async create(spaceData) {
        try {
            const space = spaceRepo.create(spaceData);
            return await spaceRepo.save(space);
        }
        catch (error) {
            throw new errorHandler_1.AppError("Error creating space", 400);
        }
    }
    static async getAll() {
        try {
            return await spaceRepo.find();
        }
        catch (error) {
            throw new errorHandler_1.AppError("Error fetching spaces", 500);
        }
    }
    static async getById(id) {
        try {
            const space = await spaceRepo.findOneBy({ id });
            if (!space)
                throw new errorHandler_1.AppError("Space not found", 404);
            return space;
        }
        catch (error) {
            if (error instanceof errorHandler_1.AppError)
                throw error;
            throw new errorHandler_1.AppError("Error fetching space", 500);
        }
    }
    static async update(id, updateData) {
        try {
            await spaceRepo.update(id, updateData);
            const updated = await spaceRepo.findOneBy({ id });
            if (!updated)
                throw new errorHandler_1.AppError("Space not found", 404);
            return updated;
        }
        catch (error) {
            if (error instanceof errorHandler_1.AppError)
                throw error;
            throw new errorHandler_1.AppError("Error updating space", 500);
        }
    }
    static async delete(id) {
        try {
            const result = await spaceRepo.delete(id);
            if (result.affected === 0) {
                throw new errorHandler_1.AppError("Space not found", 404);
            }
            return true;
        }
        catch (error) {
            if (error instanceof errorHandler_1.AppError)
                throw error;
            throw new errorHandler_1.AppError("Error deleting space", 500);
        }
    }
}
exports.SpaceService = SpaceService;
