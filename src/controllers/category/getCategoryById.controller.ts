import { Request, Response, NextFunction } from "express";
import { sendResponse, AppError } from "../../helpers/utils";
import Category from "../../models/Category";

const getCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { categoryId } = req.params;
    // Tìm theo ID
    const category = await Category.findById(categoryId).select(
      "-isDeleted -__v"
    );
    if (!category) {
      throw new AppError(404, "Category Not Found", "Get category by ID error");
    }
    // Gửi kết quả
    sendResponse(
      res,
      200,
      true,
      category,
      undefined,
      "Category found successfully"
    );
  } catch (err) {
    next(err);
  }
};

export default getCategoryById;
