"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../helpers/utils");
const Category_1 = __importDefault(require("../../models/Category"));
const deleteCategory = async (req, res, next) => {
    try {
        const { categoryId } = req.params;
        // Tìm và xóa mềm
        const deletedCategory = await Category_1.default.findByIdAndUpdate(categoryId, { isDeleted: true }, { new: true });
        if (!deletedCategory) {
            throw new utils_1.AppError(404, "Category Not Found", "Delete category by ID error");
        }
        // Gửi kết quả
        (0, utils_1.sendResponse)(res, 200, true, undefined, undefined, "Category deleted successfully");
    }
    catch (err) {
        next(err);
    }
};
exports.default = deleteCategory;
