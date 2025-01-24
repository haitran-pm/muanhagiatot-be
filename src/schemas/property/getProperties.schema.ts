// query
import Joi from "joi";
import { features } from "process";
import { z } from "zod";

// const getPropertiesQuerySchema = Joi.object({
//   title: Joi.string().trim().min(1).max(255).optional(),
//   description: Joi.string(),
//   transactionType: Joi.string(),
//   type: Joi.string(),
//   location: Joi.object({
//     address: Joi.string(),
//   }),
//   "location.address": Joi.string(),
//   "location.district": Joi.string(),
//   "location.city": Joi.string(),
//   "location.ward": Joi.string(),
//   "location.country": Joi.string(),
//   "price.value": Joi.string(),
//   status: Joi.string(),
//   author: Joi.string()
//     .regex(/^[0-9a-fA-F]{24}$/)
//     .optional(),
//   tags: Joi.string(),
//   "features.bedrooms": Joi.string(),
//   "features.bathrooms": Joi.string(),
//   "features.floorArea.value": Joi.string(),
//   project: Joi.string()
//     .regex(/^[0-9a-fA-F]{24}$/)
//     .optional(),
//   page: Joi.number().integer().min(1).default(1).optional(),
//   limit: Joi.number().integer().min(1).max(100).default(10).optional(),
// });

export const getPropertiesQuerySchema = z.object({
  title: z.string().trim().min(1).max(255).optional(),
  description: z.string().optional(),
  transactionType: z.string().optional(),
  type: z.string().optional(),
  location: z
    .object({
      address: z.string().optional(),
      district: z.string().optional(),
      city: z.string().optional(),
      ward: z.string().optional(),
      country: z.string().optional(),
    })
    .optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  status: z.string().optional(),
  author: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .optional(),
  tags: z.string().optional(),
  features: z
    .object({
      bedrooms: z.string().optional(),
      bathrooms: z.string().optional(),
      floorArea: z
        .object({
          value: z.string().optional(),
        })
        .optional(),
    })
    .optional(),
  project: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .optional(),
  page: z.number().int().min(1).default(1).optional(),
  limit: z.number().int().min(1).max(100).default(10).optional(),
});

export type GetPropertiesQueryType = Omit<
  z.infer<typeof getPropertiesQuerySchema>,
  "page" | "limit"
> & { page: number; limit: number };
