import mongoose, { Document, Schema } from "mongoose";

type PostDocument = Document & {
  title: string;
  content: string;
  author: mongoose.Types.ObjectId;
  status: "draft" | "published";
  isDeleted: boolean;
  category?: mongoose.Types.ObjectId[];
  thumbnail?: string;
  tags?: string[];
};

const postSchema: Schema<PostDocument> = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["draft", "published"],
    default: "published",
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
    required: true,
  },
  category: [{ type: Schema.Types.ObjectId, ref: "Category" }],
  thumbnail: { type: String },
  tags: [{ type: String }],
});

postSchema.pre(/^find/, function (next) {
  if (!("_conditions" in this)) return next();
  if (!("isDeleted" in postSchema.paths)) {
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

const Post =
  mongoose.models.Post || mongoose.model<PostDocument>("Post", postSchema);

export default Post;
