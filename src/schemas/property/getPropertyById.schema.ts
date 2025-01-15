// params
import Joi from "joi";

const getPropertyByIdParamsSchema = Joi.object({
  propertyId: Joi.string()
    .trim()
    .pattern(/^[a-fA-F0-9]{24}$/) // MongoDB ObjectId
    .optional(),
});

export { getPropertyByIdParamsSchema };
