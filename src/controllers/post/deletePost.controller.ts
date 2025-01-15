import { Request, Response, NextFunction } from "express";
import { sendResponse, AppError } from "../../helpers/utils";
import Post from "../../models/Post";

const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { postId } = req.params;
    // Tìm và xóa mềm
    const deletedPost = await Post.findByIdAndUpdate(
      postId,
      { isDeleted: true },
      { new: true }
    );
    if (!deletedPost) {
      throw new AppError(404, "Post Not Found", "Delete post by ID error");
    }
    // Gửi kết quả
    sendResponse(
      res,
      200,
      true,
      undefined,
      undefined,
      "Post deleted successfully"
    );
  } catch (err) {
    next(err);
  }
};

export default deletePost;
