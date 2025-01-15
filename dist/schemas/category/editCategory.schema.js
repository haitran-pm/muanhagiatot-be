"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editCategoryBodySchema = exports.editCategoryParamsSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const editCategoryParamsSchema = joi_1.default.object({
    categoryId: joi_1.default.string()
        .trim()
        .pattern(/^[a-fA-F0-9]{24}$/) // MongoDB ObjectId
        .optional(),
});
exports.editCategoryParamsSchema = editCategoryParamsSchema;
const editCategoryBodySchema = joi_1.default.object({
    name: joi_1.default.string().trim().min(1).max(255).optional(),
    description: joi_1.default.string().trim().min(1).optional(),
});
exports.editCategoryBodySchema = editCategoryBodySchema;
