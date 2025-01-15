import { Request, Response, NextFunction } from "express";
import { sendResponse, AppError } from "../../helpers/utils";
import Property from "../../models/Property";

const editProperty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { propertyId } = req.params;
    const updates = req.body;
    // Tìm và update, sau đó trả về object sau khi update
    const updatedProperty = await Property.findByIdAndUpdate(
      propertyId,
      updates,
      {
        new: true,
      }
    );
    if (!updatedProperty) {
      throw new AppError(
        404,
        "Property Not Found",
        "Update property by ID error"
      );
    }
    // Gửi kết quả
    sendResponse(
      res,
      200,
      true,
      updatedProperty,
      undefined,
      "Property updated successfully"
    );
  } catch (err) {
    next(err);
  }
};

export default editProperty;
