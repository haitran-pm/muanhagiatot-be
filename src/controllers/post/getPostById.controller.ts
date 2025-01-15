import { Request, Response, NextFunction } from "express";
import { sendResponse, AppError } from "../../helpers/utils";
import Post from "../../models/Post";

const getPostById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId).select("-isDeleted -__v");
    if (!post) {
      throw new AppError(404, "Post Not Found", "Get post by ID error");
    }
    sendResponse(res, 200, true, post, undefined, "Post found successfully");
  } catch (err) {
    next(err);
  }
};

export default getPostById;
