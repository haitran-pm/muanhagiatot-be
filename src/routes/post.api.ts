import express from "express";
import createPost from "../controllers/post/createPost.controller";
import getPosts from "../controllers/post/getPosts.controller";
import getPostById from "../controllers/post/getPostById.controller";
import editPost from "../controllers/post/editPost.controller";
import deletePost from "../controllers/post/deletePost.controller";
import validateSchema from "../middleware/validateSchema";
import { createPostBodySchema } from "../schemas/post/createPost.schema";
import { getPostsQuerySchema } from "../schemas/post/getPosts.schema";
import { getPostByIdParamsSchema } from "../schemas/post/getPostById.schema";
import {
  editPostParamsSchema,
  editPostBodySchema,
} from "../schemas/post/editPost.schema";
import { deletePostParamsSchema } from "../schemas/post/deletePost.schema";

const router = express.Router();

router.post("/", validateSchema({ body: createPostBodySchema }), createPost); // body
router.get("/", validateSchema({ query: getPostsQuerySchema }), getPosts); // query
router.get(
  "/:postId",
  validateSchema({ params: getPostByIdParamsSchema }),
  getPostById
); // params
router.patch(
  "/:postId",
  validateSchema({
    params: editPostParamsSchema,
    body: editPostBodySchema,
  }),
  editPost
); // params, body
router.delete(
  "/:postId",
  validateSchema({ params: deletePostParamsSchema }),
  deletePost
); // params

export default router;
