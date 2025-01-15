import Joi from "joi";

const editCategoryParamsSchema = Joi.object({
  categoryId: Joi.string()
    .trim()
    .pattern(/^[a-fA-F0-9]{24}$/) // MongoDB ObjectId
    .optional(),
});

const editCategoryBodySchema = Joi.object({
  name: Joi.string().trim().min(1).max(255).optional(),
  description: Joi.string().trim().min(1).optional(),
});

export { editCategoryParamsSchema, editCategoryBodySchema };
