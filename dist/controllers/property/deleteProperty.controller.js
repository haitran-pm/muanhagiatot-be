"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../helpers/utils");
const Property_1 = __importDefault(require("../../models/Property"));
const deleteProperty = async (req, res, next) => {
    try {
        const { propertyId } = req.params;
        // Tìm và xóa mềm
        const deletedProperty = await Property_1.default.findByIdAndUpdate(propertyId, { isDeleted: true }, { new: true });
        if (!deletedProperty) {
            throw new utils_1.AppError(404, "Property Not Found", "Delete property by ID error");
        }
        // Gửi kết quả
        (0, utils_1.sendResponse)(res, 200, true, undefined, undefined, "Property deleted successfully");
    }
    catch (err) {
        next(err);
    }
};
exports.default = deleteProperty;
