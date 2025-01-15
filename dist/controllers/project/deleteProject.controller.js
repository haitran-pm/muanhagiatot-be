"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../helpers/utils");
const Project_1 = __importDefault(require("../../models/Project"));
const deleteProject = async (req, res, next) => {
    try {
        const { projectId } = req.params;
        // Tìm và xóa mềm
        const deletedProject = await Project_1.default.findByIdAndUpdate(projectId, { isDeleted: true }, { new: true });
        if (!deletedProject) {
            throw new utils_1.AppError(404, "Project Not Found", "Delete project by ID error");
        }
        // Gửi kết quả
        (0, utils_1.sendResponse)(res, 200, true, undefined, undefined, "Project deleted successfully");
    }
    catch (err) {
        next(err);
    }
};
exports.default = deleteProject;
