"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostsQuerySchema = void 0;
const joi_1 = __importDefault(require("joi"));
const getPostsQuerySchema = joi_1.default.object({
    title: joi_1.default.string().trim().min(1).max(255).optional(),
    content: joi_1.default.string().trim().min(1).optional(),
    author: joi_1.default.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .optional(),
    status: joi_1.default.string().valid("draft", "published").optional(),
    category: joi_1.default.alternatives()
        .try(joi_1.default.string(), joi_1.default.array().items(joi_1.default.string()))
        .optional(),
    tags: joi_1.default.alternatives()
        .try(joi_1.default.string(), joi_1.default.array().items(joi_1.default.string()))
        .optional(),
    page: joi_1.default.number().integer().min(1).default(1).optional(),
    limit: joi_1.default.number().integer().min(1).max(100).default(10).optional(),
});
exports.getPostsQuerySchema = getPostsQuerySchema;
