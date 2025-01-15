import express from "express";
import createSubscription from "../controllers/subscription/createSubscription.controller";
import getSubscriptions from "../controllers/subscription/getSubscriptions.controller";
import getSubscriptionById from "../controllers/subscription/getSubscriptionById.controller";
import editSubscription from "../controllers/subscription/editSubscription.controller";
import deleteSubscription from "../controllers/subscription/deleteSubscription.controller";
import validateSchema from "../middleware/validateSchema";
import { createSubscriptionBodySchema } from "../schemas/subscription/createSubscription.schema";
import { getSubscriptionsQuerySchema } from "../schemas/subscription/getSubscriptions.schema";
import { getSubscriptionByIdParamsSchema } from "../schemas/subscription/getSubscriptionById.schema";
import {
  editSubscriptionParamsSchema,
  editSubscriptionBodySchema,
} from "../schemas/subscription/editSubscription.schema";
import { deleteSubscriptionParamsSchema } from "../schemas/subscription/deleteSubscription.schema";

const router = express.Router();

router.post(
  "/",
  validateSchema({ body: createSubscriptionBodySchema }),
  createSubscription
); // body
router.get(
  "/",
  validateSchema({ query: getSubscriptionsQuerySchema }),
  getSubscriptions
); // query
router.get(
  "/:subscriptionId",
  validateSchema({ params: getSubscriptionByIdParamsSchema }),
  getSubscriptionById
); // params
router.patch(
  "/:subscriptionId",
  validateSchema({
    params: editSubscriptionParamsSchema,
    body: editSubscriptionBodySchema,
  }),
  editSubscription
); // params; body
router.delete(
  "/:subscriptionId",
  validateSchema({ params: deleteSubscriptionParamsSchema }),
  deleteSubscription
); // params

export default router;
