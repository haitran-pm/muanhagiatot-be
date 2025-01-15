import express from "express";
import createProject from "../controllers/project/createProject.controller";
import getProjects from "../controllers/project/getProjects.controller";
import getProjectById from "../controllers/project/getProjectById.controller";
import editProject from "../controllers/project/editProject.controller";
import deleteProject from "../controllers/project/deleteProject.controller";
import validateSchema from "../middleware/validateSchema";
import { createProjectBodySchema } from "../schemas/project/createProject.schema";
import { getProjectsQuerySchema } from "../schemas/project/getProjects.schema";
import { getProjectByIdParamsSchema } from "../schemas/project/getProjectById.schema";
import {
  editProjectParamsSchema,
  editProjectBodySchema,
} from "../schemas/project/editProject.schema";
import { deleteProjectParamsSchema } from "../schemas/project/deleteProject.schema";

const router = express.Router();

router.post(
  "/",
  validateSchema({ body: createProjectBodySchema }),
  createProject
); // body
router.get("/", validateSchema({ query: getProjectsQuerySchema }), getProjects); // query
router.get(
  "/:projectId",
  validateSchema({ params: getProjectByIdParamsSchema }),
  getProjectById
); // params
router.patch(
  "/:projectId",
  validateSchema({
    params: editProjectParamsSchema,
    body: editProjectBodySchema,
  }),
  editProject
); // params, body
router.delete(
  "/:projectId",
  validateSchema({ params: deleteProjectParamsSchema }),
  deleteProject
); // params

export default router;
