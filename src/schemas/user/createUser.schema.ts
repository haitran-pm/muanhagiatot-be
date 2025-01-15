// body
import Joi from "joi";

const createUserBodySchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .trim()
    .required(),
  password: Joi.string().min(8).max(128).required(),
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

export { createUserBodySchema };
