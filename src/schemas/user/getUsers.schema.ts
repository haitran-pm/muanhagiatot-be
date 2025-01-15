// query
import Joi from "joi";

const getUsersQuerySchema = Joi.object({
  role: Joi.string().valid("seller", "admin").optional(),
  name: Joi.string().trim().min(1).max(255).optional(),
  page: Joi.number().integer().min(1).default(1).optional(),
  limit: Joi.number().integer().min(1).max(100).default(10).optional(),
});

export { getUsersQuerySchema };
