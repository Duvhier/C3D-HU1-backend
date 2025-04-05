// src/controller/spaceController.ts
import { Request, Response } from "express";
import { AppDataSource } from "../data-sources";
import { Space } from "../entity/Space";

const spaceRepo = AppDataSource.getRepository(Space);

// Create space
export const createSpace = async (req: Request, res: Response) => {
  try {
    const space = spaceRepo.create(req.body);
    const result = await spaceRepo.save(space);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ 
      message: "Error creating space",
      error: error.message 
    });
  }
};

// List spaces
export const getSpaces = async (_: Request, res: Response) => {
  try {
    const spaces = await spaceRepo.find();
    res.json(spaces);
  } catch (error: any) {
    res.status(500).json({ 
      message: "Error fetching spaces",
      error: error.message 
    });
  }
};

// Get space by ID
export const getSpaceById = async (req: Request, res: Response) => {
  try {
    const space = await spaceRepo.findOneBy({ id: Number(req.params.id) });
    if (!space) {
      return res.status(404).json({ message: "Space not found" });
    }
    res.json(space);
  } catch (error: any) {
    res.status(500).json({ 
      message: "Error fetching space",
      error: error.message 
    });
  }
};

// Update space
export const updateSpace = async (req: Request, res: Response) => {
  try {
    await spaceRepo.update(req.params.id, req.body);
    const updated = await spaceRepo.findOneBy({ id: Number(req.params.id) });
    if (!updated) {
      return res.status(404).json({ message: "Space not found" });
    }
    res.json(updated);
  } catch (error: any) {
    res.status(400).json({ 
      message: "Error updating space",
      error: error.message 
    });
  }
};

// Delete space
export const deleteSpace = async (req: Request, res: Response) => {
  try {
    const result = await spaceRepo.delete(req.params.id);
    if (result.affected === 0) {
      return res.status(404).json({ message: "Space not found" });
    }
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ 
      message: "Error deleting space",
      error: error.message 
    });
  }
};
