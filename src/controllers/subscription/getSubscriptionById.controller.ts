import { Request, Response, NextFunction } from "express";
import { sendResponse, AppError } from "../../helpers/utils";
import Subscription from "../../models/Subscription";

const getSubscriptionById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { subscriptionId } = req.params;
    const subscription = await Subscription.findById(subscriptionId).select(
      "-isDeleted -__v"
    );
    if (!subscription) {
      throw new AppError(
        404,
        "Subscription Not Found",
        "Get subscription by ID error"
      );
    }
    sendResponse(
      res,
      200,
      true,
      subscription,
      undefined,
      "Subscription found successfully"
    );
  } catch (err) {
    next(err);
  }
};

export default getSubscriptionById;
