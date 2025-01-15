import Joi from "joi";

const getCategoryByIdParamsSchema = Joi.object({
  categoryId: Joi.string()
    .trim()
    .pattern(/^[a-fA-F0-9]{24}$/) // MongoDB ObjectId
    .optional(),
});

export { getCategoryByIdParamsSchema };
