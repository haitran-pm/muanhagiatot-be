"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editSubscriptionBodySchema = exports.editSubscriptionParamsSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const editSubscriptionParamsSchema = joi_1.default.object({
    subscriptionId: joi_1.default.string()
        .trim()
        .pattern(/^[a-fA-F0-9]{24}$/) // MongoDB ObjectId
        .optional(),
});
exports.editSubscriptionParamsSchema = editSubscriptionParamsSchema;
const editSubscriptionBodySchema = joi_1.default.object({
    property: joi_1.default.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .optional(),
    user: joi_1.default.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .optional(),
    packageName: joi_1.default.string()
        .valid("priority_1", "priority_3", "priority_7", "featured_1", "featured_3", "featured_7")
        .optional(),
    price: joi_1.default.object({
        value: joi_1.default.number().optional(),
        currency: joi_1.default.string().optional(),
    }).optional(),
    startDate: joi_1.default.date().optional(),
    endDate: joi_1.default.date().greater(joi_1.default.ref("startDate")).optional(),
    status: joi_1.default.string()
        .valid("pending", "active", "expired", "cancelled")
        .optional(),
});
exports.editSubscriptionBodySchema = editSubscriptionBodySchema;
