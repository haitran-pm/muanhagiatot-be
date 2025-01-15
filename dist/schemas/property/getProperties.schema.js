"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPropertiesQuerySchema = void 0;
// query
const joi_1 = __importDefault(require("joi"));
const getPropertiesQuerySchema = joi_1.default.object({
    title: joi_1.default.string().trim().min(1).max(255).optional(),
    description: joi_1.default.string(),
    transactionType: joi_1.default.string(),
    type: joi_1.default.string(),
    "location.address": joi_1.default.string(),
    "location.district": joi_1.default.string(),
    "location.city": joi_1.default.string(),
    "location.ward": joi_1.default.string(),
    "location.country": joi_1.default.string(),
    "price.value": joi_1.default.string(),
    status: joi_1.default.string(),
    author: joi_1.default.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .optional(),
    tags: joi_1.default.string(),
    "features.bedrooms": joi_1.default.string(),
    "features.bathrooms": joi_1.default.string(),
    "features.floorArea.value": joi_1.default.string(),
    project: joi_1.default.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .optional(),
    page: joi_1.default.number().integer().min(1).default(1).optional(),
    limit: joi_1.default.number().integer().min(1).max(100).default(10).optional(),
});
exports.getPropertiesQuerySchema = getPropertiesQuerySchema;
