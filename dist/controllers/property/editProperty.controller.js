"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../helpers/utils");
const Property_1 = __importDefault(require("../../models/Property"));
const editProperty = async (req, res, next) => {
    try {
        const { propertyId } = req.params;
        const updates = req.body;
        // Tìm và update, sau đó trả về object sau khi update
        const updatedProperty = await Property_1.default.findByIdAndUpdate(propertyId, updates, {
            new: true,
        });
        if (!updatedProperty) {
            throw new utils_1.AppError(404, "Property Not Found", "Update property by ID error");
        }
        // Gửi kết quả
        (0, utils_1.sendResponse)(res, 200, true, updatedProperty, undefined, "Property updated successfully");
    }
    catch (err) {
        next(err);
    }
};
exports.default = editProperty;
