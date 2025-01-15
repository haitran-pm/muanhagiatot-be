"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../helpers/utils");
const Post_1 = __importDefault(require("../../models/Post"));
const editPost = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const updates = req.body;
        // Tìm và update, sau đó trả về object sau khi update
        const updatedPost = await Post_1.default.findByIdAndUpdate(postId, updates, {
            new: true,
        });
        if (!updatedPost) {
            throw new utils_1.AppError(404, "Post Not Found", "Update post by ID error");
        }
        // Gửi kết quả
        (0, utils_1.sendResponse)(res, 200, true, updatedPost, undefined, "Post updated successfully");
    }
    catch (err) {
        next(err);
    }
};
exports.default = editPost;
