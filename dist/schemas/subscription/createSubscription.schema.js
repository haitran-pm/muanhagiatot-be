"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSubscriptionBodySchema = void 0;
const joi_1 = __importDefault(require("joi"));
const createSubscriptionBodySchema = joi_1.default.object({
    property: joi_1.default.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    user: joi_1.default.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    packageName: joi_1.default.string()
        .valid("priority_1", "priority_3", "priority_7", "featured_1", "featured_3", "featured_7")
        .required(),
    price: joi_1.default.object({
        value: joi_1.default.number().required(),
        currency: joi_1.default.string().default("VND").required(),
    }).required(),
    startDate: joi_1.default.date().required(),
    endDate: joi_1.default.date().greater(joi_1.default.ref("startDate")).required(),
    status: joi_1.default.string()
        .valid("pending", "active", "expired", "cancelled")
        .default("pending")
        .required(),
});
exports.createSubscriptionBodySchema = createSubscriptionBodySchema;
