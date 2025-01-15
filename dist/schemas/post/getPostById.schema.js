"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostByIdParamsSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const getPostByIdParamsSchema = joi_1.default.object({
    postId: joi_1.default.string()
        .trim()
        .pattern(/^[a-fA-F0-9]{24}$/) // MongoDB ObjectId
        .optional(),
});
exports.getPostByIdParamsSchema = getPostByIdParamsSchema;
