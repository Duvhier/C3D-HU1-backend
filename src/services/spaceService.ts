import { AppDataSource } from "../data-sources";
import { Space } from "../entity/Space";
import { AppError } from "../middlewares/errorHandler";

const spaceRepo = AppDataSource.getRepository(Space);

export class SpaceService {
  static async create(spaceData: any) {
    try {
      const space = spaceRepo.create(spaceData);
      return await spaceRepo.save(space);
    } catch (error) {
      throw new AppError("Error creating space", 400);
    }
  }

  static async getAll() {
    try {
      return await spaceRepo.find();
    } catch (error) {
      throw new AppError("Error fetching spaces", 500);
    }
  }

  static async getById(id: number) {
    try {
      const space = await spaceRepo.findOneBy({ id });
      if (!space) throw new AppError("Space not found", 404);
      return space;
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError("Error fetching space", 500);
    }
  }

  static async update(id: number, updateData: any) {
    try {
      await spaceRepo.update(id, updateData);
      const updated = await spaceRepo.findOneBy({ id });
      if (!updated) throw new AppError("Space not found", 404);
      return updated;
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError("Error updating space", 500);
    }
  }

  static async delete(id: number) {
    try {
      const result = await spaceRepo.delete(id);
      if (result.affected === 0) {
        throw new AppError("Space not found", 404);
      }
      return true;
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError("Error deleting space", 500);
    }
  }
}
