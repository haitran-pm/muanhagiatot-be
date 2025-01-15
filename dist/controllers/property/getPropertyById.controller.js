"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../helpers/utils");
const Property_1 = __importDefault(require("../../models/Property"));
const getPropertyById = async (req, res, next) => {
    try {
        const { propertyId } = req.params;
        console.log(propertyId);
        const property = await Property_1.default.findById(propertyId).select("-isDeleted -__v");
        if (!property) {
            throw new utils_1.AppError(404, "Property Not Found", "Get property by ID error");
        }
        (0, utils_1.sendResponse)(res, 200, true, property, undefined, "Property found successfully");
    }
    catch (err) {
        next(err);
    }
};
exports.default = getPropertyById;
