"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPostBodySchema = void 0;
const joi_1 = __importDefault(require("joi"));
const createPostBodySchema = joi_1.default.object({
    title: joi_1.default.string().trim().min(1).max(255).required(),
    content: joi_1.default.string().trim().min(1).required(),
    author: joi_1.default.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    status: joi_1.default.string().valid("draft", "published").optional(),
    category: joi_1.default.array()
        .items(joi_1.default.string().regex(/^[0-9a-fA-F]{24}$/))
        .optional(),
    thumbnail: joi_1.default.string().uri().optional(),
    tags: joi_1.default.array().items(joi_1.default.string().min(1).max(50)).optional(),
});
exports.createPostBodySchema = createPostBodySchema;
