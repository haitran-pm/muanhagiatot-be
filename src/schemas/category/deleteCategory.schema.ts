import Joi from "joi";

const deleteCategoryParamsSchema = Joi.object({
  categoryId: Joi.string()
    .trim()
    .pattern(/^[a-fA-F0-9]{24}$/) // MongoDB ObjectId
    .optional(),
});

export { deleteCategoryParamsSchema };
