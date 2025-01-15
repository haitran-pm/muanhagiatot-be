import mongoose, { Document, Schema } from "mongoose";

type Location = {
  address: string;
  district: string;
  city: string;
  ward?: string;
  country?: string;
  coordinates?: {
    latitude: number;
    longtitude: number;
  };
};

type Price = {
  value: number;
  currency: string;
  type: "total" | "per_month";
};

type Features = {
  bedrooms?: number;
  bathrooms?: number;
  floorArea?: {
    value: number;
    unit: string;
  };
};

type Media = {
  type: "image" | "video";
  url: string;
};

type PropertyDocument = Document & {
  title: string;
  description: string;
  transactionType: "sale" | "rent";
  type:
    | "apartment"
    | "house"
    | "land"
    | "office"
    | "farm"
    | "warehouse"
    | "others";
  location: Location;
  price: Price;
  status: "pending" | "available" | "done";
  author: mongoose.Types.ObjectId;
  isDeleted: boolean;
  media?: Media;
  tags?: string[];
  features?: Features;
  project?: mongoose.Types.ObjectId;
};

const propertySchema: Schema<PropertyDocument> = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    transactionType: {
      type: String,
      enum: ["sale", "rent"],
      default: "sale",
      required: true,
    },
    type: {
      type: String,
      enum: [
        "apartment",
        "house",
        "land",
        "office",
        "farm",
        "warehouse",
        "others",
      ],
      default: "apartment",
      required: true,
    },
    location: {
      address: { type: String, required: true },
      district: { type: String, required: true },
      city: { type: String, required: true },
      ward: { type: String },
      country: { type: String, default: "Việt Nam" },
      coordinates: {
        latitude: { type: Number },
        longtitude: { type: Number },
      },
    },
    price: {
      value: { type: Number, required: true },
      currency: { type: String, default: "VND", required: true },
      type: {
        type: String,
        enum: ["total", "per_month"],
        default: "total",
        required: true,
      },
    },
    status: {
      type: String,
      enum: ["pending", "available", "done"],
      default: "pending",
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      required: true,
    },
    media: [
      {
        type: { type: String, enum: ["image", "video"], required: true },
        url: { type: String, required: true },
      },
    ],
    tags: [{ type: String }],
    features: {
      bedrooms: { type: Number },
      bathrooms: { type: Number },
      floorArea: {
        value: { type: Number },
        unit: { type: String, default: "m2" },
      },
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
  },
  { timestamps: true }
);

propertySchema.pre(/^find/, function (next) {
  if (!("_conditions" in this)) return next();
  if (!("isDeleted" in propertySchema.paths)) {
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

const Property =
  mongoose.models.Property ||
  mongoose.model<PropertyDocument>("Property", propertySchema);

export default Property;
