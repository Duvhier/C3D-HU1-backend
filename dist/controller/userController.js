"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getUsers = exports.createUser = void 0;
const data_sources_1 = require("../data-sources");
const User_1 = require("../entity/User");
const userRepo = data_sources_1.AppDataSource.getRepository(User_1.User);
const createUser = async (req, res) => {
    try {
        const user = userRepo.create(req.body);
        const result = await userRepo.save(user);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(400).json({
            message: "Error creating user",
            error: error.message
        });
    }
};
exports.createUser = createUser;
const getUsers = async (_, res) => {
    try {
        const users = await userRepo.find();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({
            message: "Error fetching users",
            error: error.message
        });
    }
};
exports.getUsers = getUsers;
const getUserById = async (req, res) => {
    try {
        const user = await userRepo.findOneBy({ id: Number(req.params.id) });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({
            message: "Error fetching user",
            error: error.message
        });
    }
};
exports.getUserById = getUserById;
const updateUser = async (req, res) => {
    try {
        await userRepo.update(req.params.id, req.body);
        const updated = await userRepo.findOneBy({ id: Number(req.params.id) });
        if (!updated) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(updated);
    }
    catch (error) {
        res.status(400).json({
            message: "Error updating user",
            error: error.message
        });
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    try {
        const result = await userRepo.delete(req.params.id);
        if (result.affected === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({
            message: "Error deleting user",
            error: error.message
        });
    }
};
exports.deleteUser = deleteUser;
