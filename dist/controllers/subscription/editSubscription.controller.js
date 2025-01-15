"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../helpers/utils");
const Subscription_1 = __importDefault(require("../../models/Subscription"));
const editSubscription = async (req, res, next) => {
    try {
        const { subscriptionId } = req.params;
        const updates = req.body;
        // Tìm và update, sau đó trả về object sau khi update
        const updatedSubscription = await Subscription_1.default.findByIdAndUpdate(subscriptionId, updates, {
            new: true,
        });
        if (!updatedSubscription) {
            throw new utils_1.AppError(404, "Subscription Not Found", "Update subscription by ID error");
        }
        // Gửi kết quả
        (0, utils_1.sendResponse)(res, 200, true, updatedSubscription, undefined, "Subscription updated successfully");
    }
    catch (err) {
        next(err);
    }
};
exports.default = editSubscription;
