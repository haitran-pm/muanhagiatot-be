import { Request, Response, NextFunction } from "express";
import { sendResponse } from "../../helpers/utils";
import Property from "../../models/Property";

const createProperty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newProperty = req.body;
    const created = await Property.create(newProperty);
    sendResponse(
      res,
      201,
      true,
      created,
      undefined,
      "Property created successfully"
    );
  } catch (err) {
    next(err);
  }
};

export default createProperty;
