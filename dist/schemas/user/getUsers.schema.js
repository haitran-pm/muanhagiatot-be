"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersQuerySchema = void 0;
// query
const joi_1 = __importDefault(require("joi"));
const getUsersQuerySchema = joi_1.default.object({
    role: joi_1.default.string().valid("seller", "admin").optional(),
    name: joi_1.default.string().trim().min(1).max(255).optional(),
    page: joi_1.default.number().integer().min(1).default(1).optional(),
    limit: joi_1.default.number().integer().min(1).max(100).default(10).optional(),
});
exports.getUsersQuerySchema = getUsersQuerySchema;
