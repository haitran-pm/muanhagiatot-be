import Joi from "joi";

const getPostByIdParamsSchema = Joi.object({
  postId: Joi.string()
    .trim()
    .pattern(/^[a-fA-F0-9]{24}$/) // MongoDB ObjectId
    .optional(),
});

export { getPostByIdParamsSchema };
