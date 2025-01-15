import { Request, Response, NextFunction } from "express";
import { sendResponse } from "../../helpers/utils";
import User from "../../models/User";

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Tính toán phân trang
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    // Lấy các tham số tìm kiếm từ query
    const { role, name } = req.query;
    const filter: { [key: string]: any } = {};
    if (role) filter.role = role;
    if (name) filter.name = { $regex: name, $options: "i" };
    // Tìm toàn bộ user
    const listOfFound = await User.find(filter)
      .select("-password -isDeleted -__v")
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
      "List of users found successfully"
    );
  } catch (err) {
    next(err);
  }
};

export default getUsers;
