import { Request, Response, NextFunction } from "express";
import { sendResponse, AppError } from "../../helpers/utils";
import Subscription from "../../models/Subscription";

const editSubscription = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { subscriptionId } = req.params;
    const updates = req.body;
    // Tìm và update, sau đó trả về object sau khi update
    const updatedSubscription = await Subscription.findByIdAndUpdate(
      subscriptionId,
      updates,
      {
        new: true,
      }
    );
    if (!updatedSubscription) {
      throw new AppError(
        404,
        "Subscription Not Found",
        "Update subscription by ID error"
      );
    }
    // Gửi kết quả
    sendResponse(
      res,
      200,
      true,
      updatedSubscription,
      undefined,
      "Subscription updated successfully"
    );
  } catch (err) {
    next(err);
  }
};

export default editSubscription;
