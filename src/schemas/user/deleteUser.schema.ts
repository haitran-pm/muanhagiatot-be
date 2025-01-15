// params
import Joi from "joi";

const deleteUserParamsSchema = Joi.object({
  userId: Joi.string()
    .trim()
    .pattern(/^[a-fA-F0-9]{24}$/) // MongoDB ObjectId
    .optional(),
});

export { deleteUserParamsSchema };
