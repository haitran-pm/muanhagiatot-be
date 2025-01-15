"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../helpers/utils");
const Project_1 = __importDefault(require("../../models/Project"));
const createProject = async (req, res, next) => {
    try {
        const newProject = req.body;
        const created = await Project_1.default.create(newProject);
        (0, utils_1.sendResponse)(res, 201, true, created, undefined, "Project created successfully");
    }
    catch (err) {
        next(err);
    }
};
exports.default = createProject;
