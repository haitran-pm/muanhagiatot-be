import Joi from "joi";

const createSubscriptionBodySchema = Joi.object({
  property: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  user: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  packageName: Joi.string()
    .valid(
      "priority_1",
      "priority_3",
      "priority_7",
      "featured_1",
      "featured_3",
      "featured_7"
    )
    .required(),
  price: Joi.object({
    value: Joi.number().required(),
    currency: Joi.string().default("VND").required(),
  }).required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().greater(Joi.ref("startDate")).required(),
  status: Joi.string()
    .valid("pending", "active", "expired", "cancelled")
    .default("pending")
    .required(),
});

export { createSubscriptionBodySchema };
