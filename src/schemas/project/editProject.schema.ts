// params, body
import Joi from "joi";

const editProjectParamsSchema = Joi.object({
  projectId: Joi.string()
    .trim()
    .pattern(/^[a-fA-F0-9]{24}$/) // MongoDB ObjectId
    .optional(),
});

const editProjectBodySchema = Joi.object({
  name: Joi.string().trim().min(1).max(255).optional(),
  description: Joi.string().trim().min(1).optional(),
  location: Joi.object({
    address: Joi.string().trim().optional(),
    district: Joi.string().trim().optional(),
    city: Joi.string().trim().optional(),
    ward: Joi.string().trim().optional(),
    country: Joi.string().trim().optional(),
    coordinates: Joi.object({
      latitude: Joi.number().optional(),
      longtitude: Joi.number().optional(),
    }).optional(),
  }).optional(),
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
  scale: Joi.object({
    totalArea: Joi.object({
      value: Joi.number().optional(),
      unit: Joi.string().trim().optional(),
    }).optional(),
    numberOfUnits: Joi.number().optional(),
    numberOfBuilding: Joi.number().optional(),
    numberOfFloors: Joi.number().optional(),
    buildingDensity: Joi.string().trim().optional(),
    summary: Joi.string().trim().optional(),
  }).optional(),
  amenities: Joi.array().items(Joi.string().trim().optional()),
  investor: Joi.object({
    name: Joi.string().trim().required(),
    logoUrl: Joi.string().uri().optional(),
    website: Joi.string().uri().optional(),
  }).optional(),
  developer: Joi.object({
    name: Joi.string().trim().required(),
    logoUrl: Joi.string().uri().optional(),
    website: Joi.string().uri().optional(),
  }).optional(),
  media: Joi.array()
    .items(
      Joi.object({
        type: Joi.string().valid("image", "video").required(),
        url: Joi.string().uri().required(),
      })
    )
    .optional(),
  tags: Joi.array().items(Joi.string().trim().optional()),
  startDate: Joi.string().trim().optional(),
  endDate: Joi.string().trim().optional(),
});

export { editProjectParamsSchema, editProjectBodySchema };
