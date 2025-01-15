"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../helpers/utils");
const Subscription_1 = __importDefault(require("../../models/Subscription"));
const getSubscriptions = async (req, res, next) => {
    try {
        // Pagination
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        // Extract filter
        const { property, user, packageName, "price.value": priceRange, startDate, endDate, status, } = req.query;
        // Build filter
        const filter = {};
        if (property)
            filter.property = property;
        if (user)
            filter.user = user;
        if (packageName)
            filter.packageName = packageName;
        if (priceRange) {
            // Ex: ?price.value=100000-500000
            const [minPrice, maxPrice] = priceRange
                .split("-")
                .map(Number);
            filter["price.value"] = {
                ...(minPrice && { $gte: minPrice }),
                ...(maxPrice && { $lte: maxPrice }),
            };
        }
        // Date filter. Ex: ?startDate=2025-01-01&endDate=2025-12-31
        if (startDate) {
            filter.startDate = { $gte: new Date(startDate) };
        }
        if (endDate) {
            filter.endDate = { $lte: new Date(endDate) };
        }
        if (startDate && endDate) {
            filter.$and = [
                { startDate: { $gte: new Date(startDate) } },
                { endDate: { $lte: new Date(endDate) } },
            ];
        }
        if (status)
            filter.status = status;
        // Find results
        const listOfFound = await Subscription_1.default.find(filter)
            .select("-isDeleted -__v")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
        // Send response
        (0, utils_1.sendResponse)(res, 200, true, listOfFound, undefined, "List of subscriptions found successfully");
    }
    catch (err) {
        next(err);
    }
};
exports.default = getSubscriptions;
