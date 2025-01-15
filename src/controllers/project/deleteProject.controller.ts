import { Request, Response, NextFunction } from "express";
import { sendResponse, AppError } from "../../helpers/utils";
import Project from "../../models/Project";

const deleteProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { projectId } = req.params;
    // Tìm và xóa mềm
    const deletedProject = await Project.findByIdAndUpdate(
      projectId,
      { isDeleted: true },
      { new: true }
    );
    if (!deletedProject) {
      throw new AppError(
        404,
        "Project Not Found",
        "Delete project by ID error"
      );
    }
    // Gửi kết quả
    sendResponse(
      res,
      200,
      true,
      undefined,
      undefined,
      "Project deleted successfully"
    );
  } catch (err) {
    next(err);
  }
};

export default deleteProject;
