"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../helpers/utils");
const User_1 = __importDefault(require("../../models/User"));
const deleteUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        // Tìm và xóa mềm
        const deletedUser = await User_1.default.findByIdAndUpdate(userId, { isDeleted: true }, { new: true });
        if (!deletedUser) {
            throw new utils_1.AppError(404, "User Not Found", "Delete user by ID error");
        }
        // Gửi kết quả
        (0, utils_1.sendResponse)(res, 200, true, undefined, undefined, "User deleted successfully");
    }
    catch (err) {
        next(err);
    }
};
exports.default = deleteUser;
