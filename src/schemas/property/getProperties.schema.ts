// query
import Joi from "joi";

const getPropertiesQuerySchema = Joi.object({
  title: Joi.string().trim().min(1).max(255).optional(),
  description: Joi.string(),
  transactionType: Joi.string(),
  type: Joi.string(),
  "location.address": Joi.string(),
  "location.district": Joi.string(),
  "location.city": Joi.string(),
  "location.ward": Joi.string(),
  "location.country": Joi.string(),
  "price.value": Joi.string(),
  status: Joi.string(),
  author: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .optional(),
  tags: Joi.string(),
  "features.bedrooms": Joi.string(),
  "features.bathrooms": Joi.string(),
  "features.floorArea.value": Joi.string(),
  project: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .optional(),
  page: Joi.number().integer().min(1).default(1).optional(),
  limit: Joi.number().integer().min(1).max(100).default(10).optional(),
});

export { getPropertiesQuerySchema };
