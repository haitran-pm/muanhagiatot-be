import { Request, Response, NextFunction } from "express";
import { sendResponse, AppError } from "../../helpers/utils";
import Property from "../../models/Property";

const deleteProperty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { propertyId } = req.params;
    // Tìm và xóa mềm
    const deletedProperty = await Property.findByIdAndUpdate(
      propertyId,
      { isDeleted: true },
      { new: true }
    );
    if (!deletedProperty) {
      throw new AppError(
        404,
        "Property Not Found",
        "Delete property by ID error"
      );
    }
    // Gửi kết quả
    sendResponse(
      res,
      200,
      true,
      undefined,
      undefined,
      "Property deleted successfully"
    );
  } catch (err) {
    next(err);
  }
};

export default deleteProperty;
