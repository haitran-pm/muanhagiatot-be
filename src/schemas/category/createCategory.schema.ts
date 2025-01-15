import Joi from "joi";

const createCategoryBodySchema = Joi.object({
  name: Joi.string().trim().min(1).max(255).required(),
  description: Joi.string().trim().min(1).optional(),
});

export { createCategoryBodySchema };
