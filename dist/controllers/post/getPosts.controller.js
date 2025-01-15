"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../helpers/utils");
const Post_1 = __importDefault(require("../../models/Post"));
const getPosts = async (req, res, next) => {
    try {
        // Pagination
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        // Extract filter
        const { title, content, author, status, category, tags } = req.query;
        // Build filter
        const filter = {};
        if (title)
            filter.title = { $regex: title, $options: "i" };
        if (content)
            filter.content = { $regex: content, $options: "i" };
        if (author)
            filter.author = author;
        if (status)
            filter.status = status;
        if (category && typeof category === "string")
            filter.category = {
                $in: category.split(",").map((item) => item.trim()),
            };
        if (tags && typeof tags === "string")
            filter.tags = {
                $in: tags.split(",").map((item) => item.trim()),
            };
        // Find results
        const listOfFound = await Post_1.default.find(filter)
            .select("-isDeleted -__v")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
        // Send response
        (0, utils_1.sendResponse)(res, 200, true, listOfFound, undefined, "List of posts found successfully");
    }
    catch (err) {
        next(err);
    }
};
exports.default = getPosts;
