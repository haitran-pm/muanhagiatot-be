import mongoose, { Document, Schema } from "mongoose";

type CategoryDocument = Document & {
  name: string;
  description: string;
  isDeleted: boolean;
};

const categorySchema: Schema<CategoryDocument> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: { type: String, required: false },
    isDeleted: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);

categorySchema.pre(/^find/, function (next) {
  if (!("_conditions" in this)) return next();
  if (!("isDeleted" in categorySchema.paths)) {
    delete (this as any)["_conditions"]["all"];
    return next();
  }
  if (!("all" in (this as any)["_conditions"])) {
    (this as any)["_conditions"].isDeleted = false;
  } else {
    delete (this as any)["_conditions"]["all"];
  }
  next();
});

const Category =
  mongoose.models.Category ||
  mongoose.model<CategoryDocument>("Category", categorySchema);

export default Category;
