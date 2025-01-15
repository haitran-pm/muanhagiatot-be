"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPropertyBodySchema = void 0;
// body
const joi_1 = __importDefault(require("joi"));
const createPropertyBodySchema = joi_1.default.object({
    title: joi_1.default.string().trim().min(1).max(255).required(),
    description: joi_1.default.string().trim().min(1).required(),
    transactionType: joi_1.default.string()
        .valid("sale", "rent")
        .default("sale")
        .required(),
    type: joi_1.default.string()
        .valid("apartment", "house", "land", "office", "farm", "warehouse", "others")
        .default("apartment")
        .required(),
    location: joi_1.default.object({
        address: joi_1.default.string().trim().required(),
        district: joi_1.default.string().trim().required(),
        city: joi_1.default.string().trim().required(),
        ward: joi_1.default.string().trim().optional(),
        country: joi_1.default.string().trim().default("Việt Nam").optional(),
        coordinates: joi_1.default.object({
            latitude: joi_1.default.number().optional(),
            longtitude: joi_1.default.number().optional(),
        }).optional(),
    }).required(),
    price: joi_1.default.object({
        value: joi_1.default.number().required(),
        currency: joi_1.default.string().default("VND").required(),
        type: joi_1.default.string().valid("total", "per_month").default("total").required(),
    }).required(),
    status: joi_1.default.string()
        .valid("pending", "available", "done")
        .default("pending")
        .required(),
    author: joi_1.default.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    media: joi_1.default.array()
        .items(joi_1.default.object({
        type: joi_1.default.string().valid("image", "video").required(),
        url: joi_1.default.string().uri().required(),
    }))
        .optional(),
    tags: joi_1.default.array().items(joi_1.default.string().trim().optional()),
    features: joi_1.default.object({
        bedrooms: joi_1.default.number().optional(),
        bathrooms: joi_1.default.number().optional(),
        floorArea: {
            value: joi_1.default.number().optional(),
            unit: joi_1.default.string().trim().default("m2").optional(),
        },
    }).optional(),
    project: joi_1.default.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .optional(),
});
exports.createPropertyBodySchema = createPropertyBodySchema;
