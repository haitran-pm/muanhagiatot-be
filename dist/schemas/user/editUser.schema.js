"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editUserBodySchema = exports.editUserParamsSchema = void 0;
// params; body
const joi_1 = __importDefault(require("joi"));
const editUserParamsSchema = joi_1.default.object({
    userId: joi_1.default.string()
        .trim()
        .pattern(/^[a-fA-F0-9]{24}$/) // MongoDB ObjectId
        .optional(),
});
exports.editUserParamsSchema = editUserParamsSchema;
const editUserBodySchema = joi_1.default.object({
    password: joi_1.default.string().min(8).max(128).optional(),
    role: joi_1.default.string().valid("seller", "admin").optional(),
    name: joi_1.default.string().trim().min(1).max(255).optional(),
    phone: joi_1.default.string()
        .trim()
        .pattern(/^[0-9+()\s-]*$/)
        .min(7)
        .max(15)
        .optional(),
    avatarUrl: joi_1.default.string()
        .uri({ scheme: ["http", "https"] })
        .optional(),
});
exports.editUserBodySchema = editUserBodySchema;
