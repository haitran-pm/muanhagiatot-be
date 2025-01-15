"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../helpers/utils");
const Category_1 = __importDefault(require("../../models/Category"));
const editCategory = async (req, res, next) => {
    try {
        const { categoryId } = req.params;
        const updates = req.body;
        console.log(updates);
        // Tìm và update, sau đó trả về object sau khi update
        const updatedCategory = await Category_1.default.findByIdAndUpdate(categoryId, updates, {
            new: true,
        });
        if (!updatedCategory) {
            throw new utils_1.AppError(404, "Category Not Found", "Update category by ID error");
        }
        // Gửi kết quả
        (0, utils_1.sendResponse)(res, 200, true, updatedCategory, undefined, "Category updated successfully");
    }
    catch (err) {
        next(err);
    }
};
exports.default = editCategory;
