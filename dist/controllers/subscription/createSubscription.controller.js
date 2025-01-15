"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../helpers/utils");
const Subscription_1 = __importDefault(require("../../models/Subscription"));
const createSubscription = async (req, res, next) => {
    try {
        const newSubscription = req.body;
        const created = await Subscription_1.default.create(newSubscription);
        (0, utils_1.sendResponse)(res, 201, true, created, undefined, "Subscription created successfully");
    }
    catch (err) {
        next(err);
    }
};
exports.default = createSubscription;
