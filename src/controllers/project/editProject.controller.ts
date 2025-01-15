import { Request, Response, NextFunction } from "express";
import { sendResponse, AppError } from "../../helpers/utils";
import Project from "../../models/Project";

const editProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { projectId } = req.params;
    const updates = req.body;
    // Tìm và update, sau đó trả về object sau khi update
    const updatedProject = await Project.findByIdAndUpdate(projectId, updates, {
      new: true,
    });
    if (!updatedProject) {
      throw new AppError(
        404,
        "Project Not Found",
        "Update project by ID error"
      );
    }
    // Gửi kết quả
    sendResponse(
      res,
      200,
      true,
      updatedProject,
      undefined,
      "Project updated successfully"
    );
  } catch (err) {
    next(err);
  }
};

export default editProject;
