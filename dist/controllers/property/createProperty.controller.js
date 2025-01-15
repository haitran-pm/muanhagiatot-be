"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../helpers/utils");
const Property_1 = __importDefault(require("../../models/Property"));
const createProperty = async (req, res, next) => {
    try {
        const newProperty = req.body;
        const created = await Property_1.default.create(newProperty);
        (0, utils_1.sendResponse)(res, 201, true, created, undefined, "Property created successfully");
    }
    catch (err) {
        next(err);
    }
};
exports.default = createProperty;
