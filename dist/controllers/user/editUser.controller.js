"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../helpers/utils");
const User_1 = __importDefault(require("../../models/User"));
const editUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const updates = req.body;
        // Tìm và update, sau đó trả về object sau khi update
        const updatedUser = await User_1.default.findByIdAndUpdate(userId, updates, {
            new: true,
        });
        if (!updatedUser) {
            throw new utils_1.AppError(404, "User Not Found", "Update user by ID error");
        }
        // Gửi kết quả
        (0, utils_1.sendResponse)(res, 200, true, updatedUser, undefined, "User updated successfully");
    }
    catch (err) {
        next(err);
    }
};
exports.default = editUser;
