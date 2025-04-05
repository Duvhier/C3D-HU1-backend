import { AppDataSource } from "../data-sources";
import { User } from "../entity/User";
import { AppError } from "../middlewares/errorHandler";

const userRepo = AppDataSource.getRepository(User);

export class UserService {
  static async create(userData: any) {
    try {
      const user = userRepo.create(userData);
      return await userRepo.save(user);
    } catch (error) {
      throw new AppError("Error creating user", 400);
    }
  }

  static async getAll() {
    try {
      return await userRepo.find();
    } catch (error) {
      throw new AppError("Error fetching users", 500);
    }
  }

  static async getById(id: number) {
    try {
      const user = await userRepo.findOneBy({ id });
      if (!user) throw new AppError("User not found", 404);
      return user;
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError("Error fetching user", 500);
    }
  }

  static async update(id: number, updateData: any) {
    try {
      await userRepo.update(id, updateData);
      const updated = await userRepo.findOneBy({ id });
      if (!updated) throw new AppError("User not found", 404);
      return updated;
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError("Error updating user", 500);
    }
  }

  static async delete(id: number) {
    try {
      const result = await userRepo.delete(id);
      if (result.affected === 0) {
        throw new AppError("User not found", 404);
      }
      return true;
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError("Error deleting user", 500);
    }
  }
}
