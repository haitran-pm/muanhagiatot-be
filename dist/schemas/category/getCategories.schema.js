"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategoriesQuerySchema = void 0;
const joi_1 = __importDefault(require("joi"));
const getCategoriesQuerySchema = joi_1.default.object({
    name: joi_1.default.string().trim().min(1).max(255).optional(),
    description: joi_1.default.string().trim().optional(),
    page: joi_1.default.number().integer().min(1).default(1).optional(),
    limit: joi_1.default.number().integer().min(1).max(100).default(10).optional(),
});
exports.getCategoriesQuerySchema = getCategoriesQuerySchema;
