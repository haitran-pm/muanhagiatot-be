"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../helpers/utils");
const User_1 = __importDefault(require("../../models/User"));
const getUsers = async (req, res, next) => {
    try {
        // Tính toán phân trang
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        // Lấy các tham số tìm kiếm từ query
        const { role, name } = req.query;
        const filter = {};
        if (role)
            filter.role = role;
        if (name)
            filter.name = { $regex: name, $options: "i" };
        // Tìm toàn bộ user
        const listOfFound = await User_1.default.find(filter)
            .select("-password -isDeleted -__v")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
        // Gửi kết quả
        (0, utils_1.sendResponse)(res, 200, true, listOfFound, undefined, "List of users found successfully");
    }
    catch (err) {
        next(err);
    }
};
exports.default = getUsers;
