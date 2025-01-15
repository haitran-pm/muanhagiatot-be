// query
import Joi from "joi";

const getProjectsQuerySchema = Joi.object({
  name: Joi.string().trim().min(1).max(255).optional(),
  description: Joi.string().trim().optional(),
  "location.address": Joi.string().trim().optional(),
  "location.district": Joi.string().trim().optional(),
  "location.city": Joi.string().trim().optional(),
  "location.ward": Joi.string().trim().optional(),
  "location.country": Joi.string().trim().optional(),
  type: Joi.string()
    .valid(
      "apartment",
      "office",
      "mall",
      "villa",
      "house",
      "industrial",
      "others"
    )
    .optional(),
  status: Joi.string()
    .valid("planning", "under_construction", "completed")
    .optional(),
  amenities: Joi.alternatives()
    .try(Joi.string(), Joi.array().items(Joi.string()))
    .optional(),
  "investor.name": Joi.string().optional(),
  "developer.name": Joi.string().optional(),
  tags: Joi.alternatives()
    .try(Joi.string(), Joi.array().items(Joi.string()))
    .optional(),
  page: Joi.number().integer().min(1).default(1).optional(),
  limit: Joi.number().integer().min(1).max(100).default(10).optional(),
});

export { getProjectsQuerySchema };
