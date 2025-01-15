// params
import Joi from "joi";

const getUserByIdParamsSchema = Joi.object({
  userId: Joi.string()
    .trim()
    .pattern(/^[a-fA-F0-9]{24}$/) // MongoDB ObjectId
    .optional(),
});

export { getUserByIdParamsSchema };
