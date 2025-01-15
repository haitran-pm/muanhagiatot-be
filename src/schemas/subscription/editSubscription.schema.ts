import Joi from "joi";

const editSubscriptionParamsSchema = Joi.object({
  subscriptionId: Joi.string()
    .trim()
    .pattern(/^[a-fA-F0-9]{24}$/) // MongoDB ObjectId
    .optional(),
});

const editSubscriptionBodySchema = Joi.object({
  property: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .optional(),
  user: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .optional(),
  packageName: Joi.string()
    .valid(
      "priority_1",
      "priority_3",
      "priority_7",
      "featured_1",
      "featured_3",
      "featured_7"
    )
    .optional(),
  price: Joi.object({
    value: Joi.number().optional(),
    currency: Joi.string().optional(),
  }).optional(),
  startDate: Joi.date().optional(),
  endDate: Joi.date().greater(Joi.ref("startDate")).optional(),
  status: Joi.string()
    .valid("pending", "active", "expired", "cancelled")
    .optional(),
});

export { editSubscriptionParamsSchema, editSubscriptionBodySchema };
