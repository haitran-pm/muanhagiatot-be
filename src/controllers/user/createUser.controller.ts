import bcrypt from "bcryptjs";
import { Request, Response, NextFunction } from "express";
import { sendResponse } from "../../helpers/utils";
import User from "../../models/User";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { password, ...otherData } = req.body;
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Update hashedPassword to new user object
    const newUser = { ...otherData, password: hashedPassword };
    const created = await User.create(newUser);
    sendResponse(
      res,
      201,
      true,
      created,
      undefined,
      "User created successfully"
    );
  } catch (err) {
    next(err);
  }
};

export default createUser;
