// src/routes/spaceRoutes.ts
import { Router } from "express";
import { createSpace, getSpaces, getSpaceById, updateSpace, deleteSpace } from "../controller/spaceController";

const router = Router();

router.post("/", createSpace);
router.get("/", getSpaces);
router.get("/:id", getSpaceById);
router.put("/:id", updateSpace);
router.delete("/:id", deleteSpace);

export default router;
