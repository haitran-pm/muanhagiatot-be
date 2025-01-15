import Joi from "joi";

const getSubscriptionsQuerySchema = Joi.object({
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
  "price.value": Joi.string().optional(),
  startDate: Joi.date().optional(),
  endDate: Joi.when("startDate", {
    is: Joi.exist(),
    then: Joi.date().greater(Joi.ref("startDate")).optional(),
    otherwise: Joi.date().optional(),
  }),
  status: Joi.string()
    .valid("pending", "active", "expired", "cancelled")
    .optional(),
  page: Joi.number().integer().min(1).default(1).optional(),
  limit: Joi.number().integer().min(1).max(100).default(10).optional(),
});

export { getSubscriptionsQuerySchema };
