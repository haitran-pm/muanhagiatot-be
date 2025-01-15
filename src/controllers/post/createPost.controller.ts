import { Request, Response, NextFunction } from "express";
import { sendResponse } from "../../helpers/utils";
import Post from "../../models/Post";

const createPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newPost = req.body;
    const created = await Post.create(newPost);
    sendResponse(
      res,
      201,
      true,
      created,
      undefined,
      "Post created successfully"
    );
  } catch (err) {
    next(err);
  }
};

export default createPost;
