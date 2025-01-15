import express from "express";
import createUser from "../controllers/user/createUser.controller";
import getUsers from "../controllers/user/getUsers.controller";
import getUserById from "../controllers/user/getUserById.controller";
import editUser from "../controllers/user/editUser.controller";
import deleteUser from "../controllers/user/deleteUser.controller";
import validateSchema from "../middleware/validateSchema";
import { createUserBodySchema } from "../schemas/user/createUser.schema";
import { getUsersQuerySchema } from "../schemas/user/getUsers.schema";
import { getUserByIdParamsSchema } from "../schemas/user/getUserById.schema";
import {
  editUserParamsSchema,
  editUserBodySchema,
} from "../schemas/user/editUser.schema";
import { deleteUserParamsSchema } from "../schemas/user/deleteUser.schema";

const router = express.Router();

router.post("/", validateSchema({ body: createUserBodySchema }), createUser); // body
router.get("/", validateSchema({ query: getUsersQuerySchema }), getUsers); // query
router.get(
  "/:userId",
  validateSchema({ params: getUserByIdParamsSchema }),
  getUserById
); // params
router.patch(
  "/:userId",
  validateSchema({ params: editUserParamsSchema, body: editUserBodySchema }),
  editUser
); // params; body
router.delete(
  "/:userId",
  validateSchema({ params: deleteUserParamsSchema }),
  deleteUser
); // params

export default router;
