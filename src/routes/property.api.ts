import express from "express";
import createProperty from "../controllers/property/createProperty.controller";
import getProperties from "../controllers/property/getProperties.controller";
import getPropertyById from "../controllers/property/getPropertyById.controller";
import editProperty from "../controllers/property/editProperty.controller";
import deleteProperty from "../controllers/property/deleteProperty.controller";
import validateSchema from "../middleware/validateSchema";
import { createPropertyBodySchema } from "../schemas/property/createProperty.schema";
import { getPropertiesQuerySchema } from "../schemas/property/getProperties.schema";
import { getPropertyByIdParamsSchema } from "../schemas/property/getPropertyById.schema";
import {
  editPropertyParamsSchema,
  editPropertyBodySchema,
} from "../schemas/property/editProperty.schema";
import { deletePropertyParamsSchema } from "../schemas/property/deleteProperty.schema";

const router = express.Router();

router.post(
  "/",
  validateSchema({ body: createPropertyBodySchema }),
  createProperty
); // body
router.get(
  "/",
  validateSchema({ query: getPropertiesQuerySchema }),
  getProperties
); // query
router.get(
  "/:propertyId",
  validateSchema({ params: getPropertyByIdParamsSchema }),
  getPropertyById
); // params
router.patch(
  "/:propertyId",
  validateSchema({
    params: editPropertyParamsSchema,
    body: editPropertyBodySchema,
  }),
  editProperty
); // params, body
router.delete(
  "/:propertyId",
  validateSchema({ params: deletePropertyParamsSchema }),
  deleteProperty
); // params

export default router;
