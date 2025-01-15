// params
import Joi from "joi";

const deletePropertyParamsSchema = Joi.object({
  propertyId: Joi.string()
    .trim()
    .pattern(/^[a-fA-F0-9]{24}$/) // MongoDB ObjectId
    .optional(),
});

export { deletePropertyParamsSchema };
