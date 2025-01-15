import { Request, Response, NextFunction } from "express";
import { sendResponse, AppError } from "../../helpers/utils";
import Project from "../../models/Project";

const getProjectById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findById(projectId).select("-isDeleted -__v");
    if (!project) {
      throw new AppError(404, "Project Not Found", "Get project by ID error");
    }
    sendResponse(
      res,
      200,
      true,
      project,
      undefined,
      "Project found successfully"
    );
  } catch (err) {
    next(err);
  }
};

export default getProjectById;
