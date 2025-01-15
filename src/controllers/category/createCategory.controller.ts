import { Request, Response, NextFunction } from "express";
import { sendResponse } from "../../helpers/utils";
import Category from "../../models/Category";

const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newCategory = req.body;
    const created = await Category.create(newCategory);
    sendResponse(
      res,
      201,
      true,
      created,
      undefined,
      "Category created successfully"
    );
  } catch (err) {
    next(err);
  }
};

export default createCategory;
