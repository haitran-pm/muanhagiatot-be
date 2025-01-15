import { Request, Response, NextFunction } from "express";
import { sendResponse, AppError } from "../../helpers/utils";
import User from "../../models/User";

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    // Tìm và xóa mềm
    const deletedUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true }
    );
    if (!deletedUser) {
      throw new AppError(404, "User Not Found", "Delete user by ID error");
    }
    // Gửi kết quả
    sendResponse(
      res,
      200,
      true,
      undefined,
      undefined,
      "User deleted successfully"
    );
  } catch (err) {
    next(err);
  }
};

export default deleteUser;
