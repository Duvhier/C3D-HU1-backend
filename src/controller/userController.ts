// src/controller/userController.ts
import { Request, Response } from "express";
import { AppDataSource } from "../data-sources";
import { User } from "../entity/User";

const userRepo = AppDataSource.getRepository(User);

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = userRepo.create(req.body);
    const result = await userRepo.save(user);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ 
      message: "Error creating user",
      error: error.message 
    });
  }
};

export const getUsers = async (_: Request, res: Response) => {
  try {
    const users = await userRepo.find();
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ 
      message: "Error fetching users",
      error: error.message 
    });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await userRepo.findOneBy({ id: Number(req.params.id) });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error: any) {
    res.status(500).json({ 
      message: "Error fetching user",
      error: error.message 
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    await userRepo.update(req.params.id, req.body);
    const updated = await userRepo.findOneBy({ id: Number(req.params.id) });
    if (!updated) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(updated);
  } catch (error: any) {
    res.status(400).json({ 
      message: "Error updating user",
      error: error.message 
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const result = await userRepo.delete(req.params.id);
    if (result.affected === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ 
      message: "Error deleting user",
      error: error.message 
    });
  }
};
