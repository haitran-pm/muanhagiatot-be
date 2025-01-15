"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectsQuerySchema = void 0;
// query
const joi_1 = __importDefault(require("joi"));
const getProjectsQuerySchema = joi_1.default.object({
    name: joi_1.default.string().trim().min(1).max(255).optional(),
    description: joi_1.default.string().trim().optional(),
    "location.address": joi_1.default.string().trim().optional(),
    "location.district": joi_1.default.string().trim().optional(),
    "location.city": joi_1.default.string().trim().optional(),
    "location.ward": joi_1.default.string().trim().optional(),
    "location.country": joi_1.default.string().trim().optional(),
    type: joi_1.default.string()
        .valid("apartment", "office", "mall", "villa", "house", "industrial", "others")
        .optional(),
    status: joi_1.default.string()
        .valid("planning", "under_construction", "completed")
        .optional(),
    amenities: joi_1.default.alternatives()
        .try(joi_1.default.string(), joi_1.default.array().items(joi_1.default.string()))
        .optional(),
    "investor.name": joi_1.default.string().optional(),
    "developer.name": joi_1.default.string().optional(),
    tags: joi_1.default.alternatives()
        .try(joi_1.default.string(), joi_1.default.array().items(joi_1.default.string()))
        .optional(),
    page: joi_1.default.number().integer().min(1).default(1).optional(),
    limit: joi_1.default.number().integer().min(1).max(100).default(10).optional(),
});
exports.getProjectsQuerySchema = getProjectsQuerySchema;
