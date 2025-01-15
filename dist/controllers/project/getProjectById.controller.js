"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../helpers/utils");
const Project_1 = __importDefault(require("../../models/Project"));
const getProjectById = async (req, res, next) => {
    try {
        const { projectId } = req.params;
        const project = await Project_1.default.findById(projectId).select("-isDeleted -__v");
        if (!project) {
            throw new utils_1.AppError(404, "Project Not Found", "Get project by ID error");
        }
        (0, utils_1.sendResponse)(res, 200, true, project, undefined, "Project found successfully");
    }
    catch (err) {
        next(err);
    }
};
exports.default = getProjectById;
