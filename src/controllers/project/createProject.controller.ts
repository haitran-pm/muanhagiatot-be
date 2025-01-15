import { Request, Response, NextFunction } from "express";
import { sendResponse } from "../../helpers/utils";
import Project from "../../models/Project";

const createProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newProject = req.body;
    const created = await Project.create(newProject);
    sendResponse(
      res,
      201,
      true,
      created,
      undefined,
      "Project created successfully"
    );
  } catch (err) {
    next(err);
  }
};

export default createProject;
