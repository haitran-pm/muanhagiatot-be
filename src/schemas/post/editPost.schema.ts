import Joi from "joi";

const editPostParamsSchema = Joi.object({
  postId: Joi.string()
    .trim()
    .pattern(/^[a-fA-F0-9]{24}$/) // MongoDB ObjectId
    .optional(),
});

const editPostBodySchema = Joi.object({
  title: Joi.string().trim().min(1).max(255).optional(),
  content: Joi.string().trim().min(1).optional(),
  author: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .optional(),
  status: Joi.string().valid("draft", "published").optional(),
  category: Joi.array()
    .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
    .optional(),
  thumbnail: Joi.string().uri().optional(),
  tags: Joi.array().items(Joi.string().min(1).max(50)).optional(),
});

export { editPostParamsSchema, editPostBodySchema };
