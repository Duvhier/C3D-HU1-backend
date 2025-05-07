"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSpace = exports.updateSpace = exports.getSpaceById = exports.getSpaces = exports.createSpace = void 0;
const data_sources_1 = require("../data-sources");
const Space_1 = require("../entity/Space");
const spaceRepo = data_sources_1.AppDataSource.getRepository(Space_1.Space);
// Create space
const createSpace = async (req, res) => {
    try {
        const space = spaceRepo.create(req.body);
        const result = await spaceRepo.save(space);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(400).json({
            message: "Error creating space",
            error: error.message
        });
    }
};
exports.createSpace = createSpace;
// List spaces
const getSpaces = async (_, res) => {
    try {
        const spaces = await spaceRepo.find();
        res.json(spaces);
    }
    catch (error) {
        res.status(500).json({
            message: "Error fetching spaces",
            error: error.message
        });
    }
};
exports.getSpaces = getSpaces;
// Get space by ID
const getSpaceById = async (req, res) => {
    try {
        const space = await spaceRepo.findOneBy({ id: Number(req.params.id) });
        if (!space) {
            return res.status(404).json({ message: "Space not found" });
        }
        res.json(space);
    }
    catch (error) {
        res.status(500).json({
            message: "Error fetching space",
            error: error.message
        });
    }
};
exports.getSpaceById = getSpaceById;
// Update space
const updateSpace = async (req, res) => {
    try {
        await spaceRepo.update(req.params.id, req.body);
        const updated = await spaceRepo.findOneBy({ id: Number(req.params.id) });
        if (!updated) {
            return res.status(404).json({ message: "Space not found" });
        }
        res.json(updated);
    }
    catch (error) {
        res.status(400).json({
            message: "Error updating space",
            error: error.message
        });
    }
};
exports.updateSpace = updateSpace;
// Delete space
const deleteSpace = async (req, res) => {
    try {
        const result = await spaceRepo.delete(req.params.id);
        if (result.affected === 0) {
            return res.status(404).json({ message: "Space not found" });
        }
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({
            message: "Error deleting space",
            error: error.message
        });
    }
};
exports.deleteSpace = deleteSpace;
