import { Request, Response, NextFunction } from "express";
import { sendResponse, AppError } from "../../helpers/utils";
import Post from "../../models/Post";

const editPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { postId } = req.params;
    const updates = req.body;
    // Tìm và update, sau đó trả về object sau khi update
    const updatedPost = await Post.findByIdAndUpdate(postId, updates, {
      new: true,
    });
    if (!updatedPost) {
      throw new AppError(404, "Post Not Found", "Update post by ID error");
    }
    // Gửi kết quả
    sendResponse(
      res,
      200,
      true,
      updatedPost,
      undefined,
      "Post updated successfully"
    );
  } catch (err) {
    next(err);
  }
};

export default editPost;
