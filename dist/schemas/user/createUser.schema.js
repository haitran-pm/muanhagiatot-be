"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserBodySchema = void 0;
// body
const joi_1 = __importDefault(require("joi"));
const createUserBodySchema = joi_1.default.object({
    email: joi_1.default.string()
        .email({ tlds: { allow: false } })
        .trim()
        .required(),
    password: joi_1.default.string().min(8).max(128).required(),
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
exports.createUserBodySchema = createUserBodySchema;
