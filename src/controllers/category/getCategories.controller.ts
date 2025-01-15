import { Request, Response, NextFunction } from "express";
import { sendResponse } from "../../helpers/utils";
import Category from "../../models/Category";

const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Tính toán phân trang
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    // Lấy các tham số tìm kiếm từ query
    const { name, description } = req.query;
    const filter: { [key: string]: any } = {};
    if (name) filter.name = { $regex: name, $options: "i" };
    if (description)
      filter.description = { $regex: description, $options: "i" };
    // Tìm toàn bộ
    const listOfFound = await Category.find(filter)
      .select("-isDeleted -__v")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    // Gửi kết quả
    sendResponse(
      res,
      200,
      true,
      listOfFound,
      undefined,
      "List of categories found successfully"
    );
  } catch (err) {
    next(err);
  }
};

export default getCategories;
