"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../helpers/utils");
const Subscription_1 = __importDefault(require("../../models/Subscription"));
const deleteSubscription = async (req, res, next) => {
    try {
        const { subscriptionId } = req.params;
        // Tìm và xóa mềm
        const deletedSubscription = await Subscription_1.default.findByIdAndUpdate(subscriptionId, { isDeleted: true }, { new: true });
        if (!deletedSubscription) {
            throw new utils_1.AppError(404, "Subscription Not Found", "Delete subscription by ID error");
        }
        // Gửi kết quả
        (0, utils_1.sendResponse)(res, 200, true, undefined, undefined, "Subscription deleted successfully");
    }
    catch (err) {
        next(err);
    }
};
exports.default = deleteSubscription;
