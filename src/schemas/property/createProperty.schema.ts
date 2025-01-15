// body
import Joi from "joi";

const createPropertyBodySchema = Joi.object({
  title: Joi.string().trim().min(1).max(255).required(),
  description: Joi.string().trim().min(1).required(),
  transactionType: Joi.string()
    .valid("sale", "rent")
    .default("sale")
    .required(),
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
    .default("apartment")
    .required(),
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
  price: Joi.object({
    value: Joi.number().required(),
    currency: Joi.string().default("VND").required(),
    type: Joi.string().valid("total", "per_month").default("total").required(),
  }).required(),
  status: Joi.string()
    .valid("pending", "available", "done")
    .default("pending")
    .required(),
  author: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  media: Joi.array()
    .items(
      Joi.object({
        type: Joi.string().valid("image", "video").required(),
        url: Joi.string().uri().required(),
      })
    )
    .optional(),
  tags: Joi.array().items(Joi.string().trim().optional()),
  features: Joi.object({
    bedrooms: Joi.number().optional(),
    bathrooms: Joi.number().optional(),
    floorArea: {
      value: Joi.number().optional(),
      unit: Joi.string().trim().default("m2").optional(),
    },
  }).optional(),
  project: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .optional(),
});

export { createPropertyBodySchema };
