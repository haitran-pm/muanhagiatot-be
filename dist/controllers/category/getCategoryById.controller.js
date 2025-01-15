"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../helpers/utils");
const Category_1 = __importDefault(require("../../models/Category"));
const getCategoryById = async (req, res, next) => {
    try {
        const { categoryId } = req.params;
        // Tìm theo ID
        const category = await Category_1.default.findById(categoryId).select("-isDeleted -__v");
        if (!category) {
            throw new utils_1.AppError(404, "Category Not Found", "Get category by ID error");
        }
        // Gửi kết quả
        (0, utils_1.sendResponse)(res, 200, true, category, undefined, "Category found successfully");
    }
    catch (err) {
        next(err);
    }
};
exports.default = getCategoryById;
