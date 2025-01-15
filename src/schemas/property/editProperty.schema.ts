// params, body
import Joi from "joi";

const editPropertyParamsSchema = Joi.object({
  propertyId: Joi.string()
    .trim()
    .pattern(/^[a-fA-F0-9]{24}$/) // MongoDB ObjectId
    .optional(),
});

const editPropertyBodySchema = Joi.object({
  title: Joi.string().trim().min(1).max(255).optional(),
  description: Joi.string().trim().min(1).optional(),
  transactionType: Joi.string().valid("sale", "rent").optional(),
  type: Joi.string()
    .valid(
      "apartment",
      "house",
      "land",
      "office",
      "farm",
      "warehouse",
      "others"
    )
    .optional(),
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
  price: Joi.object({
    value: Joi.number().optional(),
    currency: Joi.string().optional(),
    type: Joi.string().valid("total", "per_month").optional(),
  }).optional(),
  status: Joi.string().valid("pending", "available", "done").optional(),
  media: Joi.array()
    .items(
      Joi.object({
        type: Joi.string().valid("image", "video").optional(),
        url: Joi.string().uri().optional(),
      })
    )
    .optional(),
  tags: Joi.array().items(Joi.string().trim().optional()),
  features: Joi.object({
    bedrooms: Joi.number().optional(),
    bathrooms: Joi.number().optional(),
    floorArea: {
      value: Joi.number().optional(),
      unit: Joi.string().trim().optional(),
    },
  }).optional(),
  project: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .optional(),
});

export { editPropertyParamsSchema, editPropertyBodySchema };
