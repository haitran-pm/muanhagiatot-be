import { Request, Response, NextFunction } from "express";
import { sendResponse } from "../../helpers/utils";
import Post from "../../models/Post";

const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Pagination
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    // Extract filter
    const { title, content, author, status, category, tags } = req.query;
    // Build filter
    const filter: { [key: string]: unknown } = {};
    if (title) filter.title = { $regex: title, $options: "i" };
    if (content) filter.content = { $regex: content, $options: "i" };
    if (author) filter.author = author;
    if (status) filter.status = status;
    if (category && typeof category === "string")
      filter.category = {
        $in: category.split(",").map((item) => item.trim()),
      };
    if (tags && typeof tags === "string")
      filter.tags = {
        $in: tags.split(",").map((item) => item.trim()),
      };
    // Find results
    const listOfFound = await Post.find(filter)
      .select("-isDeleted -__v")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    // Send response
    sendResponse(
      res,
      200,
      true,
      listOfFound,
      undefined,
      "List of posts found successfully"
    );
  } catch (err) {
    next(err);
  }
};

export default getPosts;
