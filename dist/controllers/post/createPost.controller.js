"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../helpers/utils");
const Post_1 = __importDefault(require("../../models/Post"));
const createPost = async (req, res, next) => {
    try {
        const newPost = req.body;
        const created = await Post_1.default.create(newPost);
        (0, utils_1.sendResponse)(res, 201, true, created, undefined, "Post created successfully");
    }
    catch (err) {
        next(err);
    }
};
exports.default = createPost;
