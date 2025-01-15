"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../helpers/utils");
const Category_1 = __importDefault(require("../../models/Category"));
const createCategory = async (req, res, next) => {
    try {
        const newCategory = req.body;
        const created = await Category_1.default.create(newCategory);
        (0, utils_1.sendResponse)(res, 201, true, created, undefined, "Category created successfully");
    }
    catch (err) {
        next(err);
    }
};
exports.default = createCategory;
