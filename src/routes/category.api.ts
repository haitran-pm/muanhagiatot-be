import express from "express";
import createCategory from "../controllers/category/createCategory.controller";
import getCategories from "../controllers/category/getCategories.controller";
import getCategoryById from "../controllers/category/getCategoryById.controller";
import editCategory from "../controllers/category/editCategory.controller";
import deleteCategory from "../controllers/category/deleteCategory.controller";
import validateSchema from "../middleware/validateSchema";
import { createCategoryBodySchema } from "../schemas/category/createCategory.schema";
import { getCategoriesQuerySchema } from "../schemas/category/getCategories.schema";
import { getCategoryByIdParamsSchema } from "../schemas/category/getCategoryById.schema";
import {
  editCategoryParamsSchema,
  editCategoryBodySchema,
} from "../schemas/category/editCategory.schema";
import { deleteCategoryParamsSchema } from "../schemas/category/deleteCategory.schema";

const router = express.Router();

router.post(
  "/",
  validateSchema({ body: createCategoryBodySchema }),
  createCategory
); // body
router.get(
  "/",
  validateSchema({ query: getCategoriesQuerySchema }),
  getCategories
); // query
router.get(
  "/:categoryId",
  validateSchema({ params: getCategoryByIdParamsSchema }),
  getCategoryById
); // params
router.patch(
  "/:categoryId",
  validateSchema({
    params: editCategoryParamsSchema,
    body: editCategoryBodySchema,
  }),
  editCategory
); // params; body
router.delete(
  "/:categoryId",
  validateSchema({ params: deleteCategoryParamsSchema }),
  deleteCategory
); // params

export default router;
