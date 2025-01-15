import { Request, Response, NextFunction } from "express";
import { sendResponse, AppError } from "../../helpers/utils";
import Category from "../../models/Category";

const editCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { categoryId } = req.params;
    const updates = req.body;
    console.log(updates);
    // Tìm và update, sau đó trả về object sau khi update
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      updates,
      {
        new: true,
      }
    );
    if (!updatedCategory) {
      throw new AppError(
        404,
        "Category Not Found",
        "Update category by ID error"
      );
    }
    // Gửi kết quả
    sendResponse(
      res,
      200,
      true,
      updatedCategory,
      undefined,
      "Category updated successfully"
    );
  } catch (err) {
    next(err);
  }
};

export default editCategory;
