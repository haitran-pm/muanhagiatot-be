import Joi from "joi";

const createPostBodySchema = Joi.object({
  title: Joi.string().trim().min(1).max(255).required(),
  content: Joi.string().trim().min(1).required(),
  author: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  status: Joi.string().valid("draft", "published").optional(),
  category: Joi.array()
    .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
    .optional(),
  thumbnail: Joi.string().uri().optional(),
  tags: Joi.array().items(Joi.string().min(1).max(50)).optional(),
});

export { createPostBodySchema };
