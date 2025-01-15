"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategoryBodySchema = void 0;
const joi_1 = __importDefault(require("joi"));
const createCategoryBodySchema = joi_1.default.object({
    name: joi_1.default.string().trim().min(1).max(255).required(),
    description: joi_1.default.string().trim().min(1).optional(),
});
exports.createCategoryBodySchema = createCategoryBodySchema;
