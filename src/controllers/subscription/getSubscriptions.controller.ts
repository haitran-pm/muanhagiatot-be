import { Request, Response, NextFunction } from "express";
import { sendResponse } from "../../helpers/utils";
import Subscription from "../../models/Subscription";

const getSubscriptions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Pagination
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    // Extract filter
    const {
      property,
      user,
      packageName,
      "price.value": priceRange,
      startDate,
      endDate,
      status,
    } = req.query;
    // Build filter
    const filter: { [key: string]: unknown } = {};
    if (property) filter.property = property;
    if (user) filter.user = user;
    if (packageName) filter.packageName = packageName;
    if (priceRange) {
      // Ex: ?price.value=100000-500000
      const [minPrice, maxPrice] = (priceRange as string)
        .split("-")
        .map(Number);
      filter["price.value"] = {
        ...(minPrice && { $gte: minPrice }),
        ...(maxPrice && { $lte: maxPrice }),
      };
    }
    // Date filter. Ex: ?startDate=2025-01-01&endDate=2025-12-31
    if (startDate) {
      filter.startDate = { $gte: new Date(startDate as string) };
    }
    if (endDate) {
      filter.endDate = { $lte: new Date(endDate as string) };
    }
    if (startDate && endDate) {
      filter.$and = [
        { startDate: { $gte: new Date(startDate as string) } },
        { endDate: { $lte: new Date(endDate as string) } },
      ];
    }
    if (status) filter.status = status;
    // Find results
    const listOfFound = await Subscription.find(filter)
      .select("-isDeleted -__v")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    // Send response
    sendResponse(
      res,
      200,
      true,
      listOfFound,
      undefined,
      "List of subscriptions found successfully"
    );
  } catch (err) {
    next(err);
  }
};

export default getSubscriptions;
