"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../helpers/utils");
const Post_1 = __importDefault(require("../../models/Post"));
const getPostById = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const post = await Post_1.default.findById(postId).select("-isDeleted -__v");
        if (!post) {
            throw new utils_1.AppError(404, "Post Not Found", "Get post by ID error");
        }
        (0, utils_1.sendResponse)(res, 200, true, post, undefined, "Post found successfully");
    }
    catch (err) {
        next(err);
    }
};
exports.default = getPostById;
