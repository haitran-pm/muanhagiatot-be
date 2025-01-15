import { Request, Response, NextFunction } from "express";
import { sendResponse, AppError } from "../../helpers/utils";
import Subscription from "../../models/Subscription";

const deleteSubscription = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { subscriptionId } = req.params;
    // Tìm và xóa mềm
    const deletedSubscription = await Subscription.findByIdAndUpdate(
      subscriptionId,
      { isDeleted: true },
      { new: true }
    );
    if (!deletedSubscription) {
      throw new AppError(
        404,
        "Subscription Not Found",
        "Delete subscription by ID error"
      );
    }
    // Gửi kết quả
    sendResponse(
      res,
      200,
      true,
      undefined,
      undefined,
      "Subscription deleted successfully"
    );
  } catch (err) {
    next(err);
  }
};

export default deleteSubscription;
