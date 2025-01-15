import { Request, Response, NextFunction } from "express";
import { sendResponse, AppError } from "../../helpers/utils";
import User from "../../models/User";

const editUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const updates = req.body;
    // Tìm và update, sau đó trả về object sau khi update
    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    });
    if (!updatedUser) {
      throw new AppError(404, "User Not Found", "Update user by ID error");
    }
    // Gửi kết quả
    sendResponse(
      res,
      200,
      true,
      updatedUser,
      undefined,
      "User updated successfully"
    );
  } catch (err) {
    next(err);
  }
};

export default editUser;
