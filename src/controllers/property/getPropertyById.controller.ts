import { Request, Response, NextFunction } from "express";
import { sendResponse, AppError } from "../../helpers/utils";
import Property from "../../models/Property";

const getPropertyById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { propertyId } = req.params;
    console.log(propertyId);
    const property = await Property.findById(propertyId).select(
      "-isDeleted -__v"
    );
    if (!property) {
      throw new AppError(404, "Property Not Found", "Get property by ID error");
    }
    sendResponse(
      res,
      200,
      true,
      property,
      undefined,
      "Property found successfully"
    );
  } catch (err) {
    next(err);
  }
};

export default getPropertyById;
