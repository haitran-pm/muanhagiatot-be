import mongoose, { Document, Schema } from "mongoose";

type UserDocument = Document & {
  email: string;
  password: string;
  role: "seller" | "admin";
  isDeleted: boolean;
  name?: string;
  phone?: string;
  avatarUrl?: string;
};

const userSchema: Schema<UserDocument> = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["seller", "admin"],
      default: "seller",
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      required: true,
    },
    name: {
      type: String,
      required: false,
    },
    phone: { type: String, required: false },
    avatarUrl: { type: String, required: false },
  },
  { timestamps: true }
);

userSchema.pre(/^find/, function (next) {
  if (!("_conditions" in this)) return next();
  if (!("isDeleted" in userSchema.paths)) {
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

const User =
  mongoose.models.User || mongoose.model<UserDocument>("User", userSchema);

export default User;
