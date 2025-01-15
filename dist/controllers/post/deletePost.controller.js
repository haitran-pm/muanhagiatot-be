"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../helpers/utils");
const Post_1 = __importDefault(require("../../models/Post"));
const deletePost = async (req, res, next) => {
    try {
        const { postId } = req.params;
        // Tìm và xóa mềm
        const deletedPost = await Post_1.default.findByIdAndUpdate(postId, { isDeleted: true }, { new: true });
        if (!deletedPost) {
            throw new utils_1.AppError(404, "Post Not Found", "Delete post by ID error");
        }
        // Gửi kết quả
        (0, utils_1.sendResponse)(res, 200, true, undefined, undefined, "Post deleted successfully");
    }
    catch (err) {
        next(err);
    }
};
exports.default = deletePost;
