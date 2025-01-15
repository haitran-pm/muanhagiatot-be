// params; body
import Joi from "joi";

const editUserParamsSchema = Joi.object({
  userId: Joi.string()
    .trim()
    .pattern(/^[a-fA-F0-9]{24}$/) // MongoDB ObjectId
    .optional(),
});

const editUserBodySchema = Joi.object({
  password: Joi.string().min(8).max(128).optional(),
  role: Joi.string().valid("seller", "admin").optional(),
  name: Joi.string().trim().min(1).max(255).optional(),
  phone: Joi.string()
    .trim()
    .pattern(/^[0-9+()\s-]*$/)
    .min(7)
    .max(15)
    .optional(),
  avatarUrl: Joi.string()
    .uri({ scheme: ["http", "https"] })
    .optional(),
});

export { editUserParamsSchema, editUserBodySchema };
