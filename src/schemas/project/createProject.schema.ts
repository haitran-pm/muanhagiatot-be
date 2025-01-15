// body
import Joi from "joi";

const createProjectBodySchema = Joi.object({
  name: Joi.string().trim().min(1).max(255).required(),
  description: Joi.string().trim().min(1).required(),
  location: Joi.object({
    address: Joi.string().trim().required(),
    district: Joi.string().trim().required(),
    city: Joi.string().trim().required(),
    ward: Joi.string().trim().optional(),
    country: Joi.string().trim().default("Việt Nam").optional(),
    coordinates: Joi.object({
      latitude: Joi.number().optional(),
      longtitude: Joi.number().optional(),
    }).optional(),
  }).required(),
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
    .default("apartment")
    .required(),
  status: Joi.string()
    .valid("planning", "under_construction", "completed")
    .default("planning")
    .required(),
  scale: Joi.object({
    totalArea: Joi.object({
      value: Joi.number().optional(),
      unit: Joi.string().trim().default("m2").optional(),
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

export { createProjectBodySchema };
