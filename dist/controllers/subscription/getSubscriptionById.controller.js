"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../helpers/utils");
const Subscription_1 = __importDefault(require("../../models/Subscription"));
const getSubscriptionById = async (req, res, next) => {
    try {
        const { subscriptionId } = req.params;
        const subscription = await Subscription_1.default.findById(subscriptionId).select("-isDeleted -__v");
        if (!subscription) {
            throw new utils_1.AppError(404, "Subscription Not Found", "Get subscription by ID error");
        }
        (0, utils_1.sendResponse)(res, 200, true, subscription, undefined, "Subscription found successfully");
    }
    catch (err) {
        next(err);
    }
};
exports.default = getSubscriptionById;
