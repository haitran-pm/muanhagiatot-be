"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubscriptionsQuerySchema = void 0;
const joi_1 = __importDefault(require("joi"));
const getSubscriptionsQuerySchema = joi_1.default.object({
    property: joi_1.default.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .optional(),
    user: joi_1.default.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .optional(),
    packageName: joi_1.default.string()
        .valid("priority_1", "priority_3", "priority_7", "featured_1", "featured_3", "featured_7")
        .optional(),
    "price.value": joi_1.default.string().optional(),
    startDate: joi_1.default.date().optional(),
    endDate: joi_1.default.when("startDate", {
        is: joi_1.default.exist(),
        then: joi_1.default.date().greater(joi_1.default.ref("startDate")).optional(),
        otherwise: joi_1.default.date().optional(),
    }),
    status: joi_1.default.string()
        .valid("pending", "active", "expired", "cancelled")
        .optional(),
    page: joi_1.default.number().integer().min(1).default(1).optional(),
    limit: joi_1.default.number().integer().min(1).max(100).default(10).optional(),
});
exports.getSubscriptionsQuerySchema = getSubscriptionsQuerySchema;
