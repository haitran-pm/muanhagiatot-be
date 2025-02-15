"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProjectBodySchema = void 0;
// body
const joi_1 = __importDefault(require("joi"));
const createProjectBodySchema = joi_1.default.object({
    name: joi_1.default.string().trim().min(1).max(255).required(),
    description: joi_1.default.string().trim().min(1).required(),
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
    type: joi_1.default.string()
        .valid("apartment", "office", "mall", "villa", "house", "industrial", "others")
        .default("apartment")
        .required(),
    status: joi_1.default.string()
        .valid("planning", "under_construction", "completed")
        .default("planning")
        .required(),
    scale: joi_1.default.object({
        totalArea: joi_1.default.object({
            value: joi_1.default.number().optional(),
            unit: joi_1.default.string().trim().default("m2").optional(),
        }).optional(),
        numberOfUnits: joi_1.default.number().optional(),
        numberOfBuilding: joi_1.default.number().optional(),
        numberOfFloors: joi_1.default.number().optional(),
        buildingDensity: joi_1.default.string().trim().optional(),
        summary: joi_1.default.string().trim().optional(),
    }).optional(),
    amenities: joi_1.default.array().items(joi_1.default.string().trim().optional()),
    investor: joi_1.default.object({
        name: joi_1.default.string().trim().required(),
        logoUrl: joi_1.default.string().uri().optional(),
        website: joi_1.default.string().uri().optional(),
    }).optional(),
    developer: joi_1.default.object({
        name: joi_1.default.string().trim().required(),
        logoUrl: joi_1.default.string().uri().optional(),
        website: joi_1.default.string().uri().optional(),
    }).optional(),
    media: joi_1.default.array()
        .items(joi_1.default.object({
        type: joi_1.default.string().valid("image", "video").required(),
        url: joi_1.default.string().uri().required(),
    }))
        .optional(),
    tags: joi_1.default.array().items(joi_1.default.string().trim().optional()),
    startDate: joi_1.default.string().trim().optional(),
    endDate: joi_1.default.string().trim().optional(),
});
exports.createProjectBodySchema = createProjectBodySchema;
