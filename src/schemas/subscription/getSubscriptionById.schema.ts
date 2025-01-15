import Joi from "joi";

const getSubscriptionByIdParamsSchema = Joi.object({
  subscriptionId: Joi.string()
    .trim()
    .pattern(/^[a-fA-F0-9]{24}$/) // MongoDB ObjectId
    .optional(),
});

export { getSubscriptionByIdParamsSchema };
