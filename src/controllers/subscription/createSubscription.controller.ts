import { Request, Response, NextFunction } from "express";
import { sendResponse } from "../../helpers/utils";
import Subscription from "../../models/Subscription";

const createSubscription = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newSubscription = req.body;
    const created = await Subscription.create(newSubscription);
    sendResponse(
      res,
      201,
      true,
      created,
      undefined,
      "Subscription created successfully"
    );
  } catch (err) {
    next(err);
  }
};

export default createSubscription;
