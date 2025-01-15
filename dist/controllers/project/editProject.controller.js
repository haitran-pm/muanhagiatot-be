"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../helpers/utils");
const Project_1 = __importDefault(require("../../models/Project"));
const editProject = async (req, res, next) => {
    try {
        const { projectId } = req.params;
        const updates = req.body;
        // Tìm và update, sau đó trả về object sau khi update
        const updatedProject = await Project_1.default.findByIdAndUpdate(projectId, updates, {
            new: true,
        });
        if (!updatedProject) {
            throw new utils_1.AppError(404, "Project Not Found", "Update project by ID error");
        }
        // Gửi kết quả
        (0, utils_1.sendResponse)(res, 200, true, updatedProject, undefined, "Project updated successfully");
    }
    catch (err) {
        next(err);
    }
};
exports.default = editProject;
