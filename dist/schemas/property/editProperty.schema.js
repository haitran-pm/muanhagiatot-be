"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editPropertyBodySchema = exports.editPropertyParamsSchema = void 0;
// params, body
const joi_1 = __importDefault(require("joi"));
const editPropertyParamsSchema = joi_1.default.object({
    propertyId: joi_1.default.string()
        .trim()
        .pattern(/^[a-fA-F0-9]{24}$/) // MongoDB ObjectId
        .optional(),
});
exports.editPropertyParamsSchema = editPropertyParamsSchema;
const editPropertyBodySchema = joi_1.default.object({
    title: joi_1.default.string().trim().min(1).max(255).optional(),
    description: joi_1.default.string().trim().min(1).optional(),
    transactionType: joi_1.default.string().valid("sale", "rent").optional(),
    type: joi_1.default.string()
        .valid("apartment", "house", "land", "office", "farm", "warehouse", "others")
        .optional(),
    location: joi_1.default.object({
        address: joi_1.default.string().trim().optional(),
        district: joi_1.default.string().trim().optional(),
        city: joi_1.default.string().trim().optional(),
        ward: joi_1.default.string().trim().optional(),
        country: joi_1.default.string().trim().optional(),
        coordinates: joi_1.default.object({
            latitude: joi_1.default.number().optional(),
            longtitude: joi_1.default.number().optional(),
        }).optional(),
    }).optional(),
    price: joi_1.default.object({
        value: joi_1.default.number().optional(),
        currency: joi_1.default.string().optional(),
        type: joi_1.default.string().valid("total", "per_month").optional(),
    }).optional(),
    status: joi_1.default.string().valid("pending", "available", "done").optional(),
    media: joi_1.default.array()
        .items(joi_1.default.object({
        type: joi_1.default.string().valid("image", "video").optional(),
        url: joi_1.default.string().uri().optional(),
    }))
        .optional(),
    tags: joi_1.default.array().items(joi_1.default.string().trim().optional()),
    features: joi_1.default.object({
        bedrooms: joi_1.default.number().optional(),
        bathrooms: joi_1.default.number().optional(),
        floorArea: {
            value: joi_1.default.number().optional(),
            unit: joi_1.default.string().trim().optional(),
        },
    }).optional(),
    project: joi_1.default.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .optional(),
});
exports.editPropertyBodySchema = editPropertyBodySchema;
