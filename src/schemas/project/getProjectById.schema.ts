// params
import Joi from "joi";

const getProjectByIdParamsSchema = Joi.object({
  projectId: Joi.string()
    .trim()
    .pattern(/^[a-fA-F0-9]{24}$/) // MongoDB ObjectId
    .optional(),
});

export { getProjectByIdParamsSchema };
