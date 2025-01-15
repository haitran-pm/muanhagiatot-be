"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../helpers/utils");
const User_1 = __importDefault(require("../../models/User"));
const getUserById = async (req, res, next) => {
    try {
        const { userId } = req.params;
        // Tìm user theo ID
        const user = await User_1.default.findById(userId).select("-password -isDeleted -__v");
        if (!user) {
            throw new utils_1.AppError(404, "User Not Found", "Get user by ID error");
        }
        // Gửi kết quả
        (0, utils_1.sendResponse)(res, 200, true, user, undefined, "User found successfully");
    }
    catch (err) {
        next(err);
    }
};
exports.default = getUserById;
