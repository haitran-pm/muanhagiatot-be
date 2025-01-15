import Joi from "joi";

const getPostsQuerySchema = Joi.object({
  title: Joi.string().trim().min(1).max(255).optional(),
  content: Joi.string().trim().min(1).optional(),
  author: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .optional(),
  status: Joi.string().valid("draft", "published").optional(),
  category: Joi.alternatives()
    .try(Joi.string(), Joi.array().items(Joi.string()))
    .optional(),
  tags: Joi.alternatives()
    .try(Joi.string(), Joi.array().items(Joi.string()))
    .optional(),
  page: Joi.number().integer().min(1).default(1).optional(),
  limit: Joi.number().integer().min(1).max(100).default(10).optional(),
});

export { getPostsQuerySchema };
