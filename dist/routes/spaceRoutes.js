"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/spaceRoutes.ts
const express_1 = require("express");
const spaceController_1 = require("../controller/spaceController");
const router = (0, express_1.Router)();
router.post("/", spaceController_1.createSpace);
router.get("/", spaceController_1.getSpaces);
router.get("/:id", spaceController_1.getSpaceById);
router.put("/:id", spaceController_1.updateSpace);
router.delete("/:id", spaceController_1.deleteSpace);
exports.default = router;
