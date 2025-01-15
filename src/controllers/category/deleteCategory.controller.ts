import { Request, Response, NextFunction } from "express";
import { sendResponse, AppError } from "../../helpers/utils";
import Category from "../../models/Category";

const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { categoryId } = req.params;
    // Tìm và xóa mềm
    const deletedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { isDeleted: true },
      { new: true }
    );
    if (!deletedCategory) {
      throw new AppError(
        404,
        "Category Not Found",
        "Delete category by ID error"
      );
    }
    // Gửi kết quả
    sendResponse(
      res,
      200,
      true,
      undefined,
      undefined,
      "Category deleted successfully"
    );
  } catch (err) {
    next(err);
  }
};

export default deleteCategory;
