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

type Investor = {
  name: string;
  logoUrl?: string;
  website?: string;
};

type Developer = {
  name: string;
  logoUrl?: string;
  website?: string;
};

type Scale = {
  totalArea?: {
    // Tổng diện tích
    value: number;
    unit: string;
  };
  numberOfUnits?: number; // Số lượng căn
  numberOfBuilding?: number; // Số lượng tòa nhà
  numberOfFloors?: number; // Số lượng tầng
  buildingDensity?: string; // Mật độ xây dựng
  summary?: string; // Tóm tắt quy mô
};

type Media = {
  type: "image" | "video";
  url: string;
};

type ProjectDocument = Document & {
  name: string;
  description: string;
  location: Location;
  type:
    | "apartment"
    | "office"
    | "mall"
    | "villa"
    | "house"
    | "industrial"
    | "others";
  status: "planning" | "under_construction" | "completed";
  isDeleted: boolean;
  scale?: Scale;
  amenities?: string[]; // tiện ích
  investor?: Investor;
  developer?: Developer;
  media?: Media;
  tags?: string[];
  startDate?: Date;
  endDate?: Date;
};

const projectSchema: Schema<ProjectDocument> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: { type: String, required: true },
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
    type: {
      type: String,
      enum: [
        "apartment",
        "office",
        "mall",
        "villa",
        "house",
        "industrial",
        "others",
      ],
      default: "apartment",
      required: true,
    },
    status: {
      type: String,
      enum: ["planning", "under_construction", "completed"],
      default: "planning",
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      required: true,
    },
    scale: {
      totalArea: {
        value: { type: Number },
        unit: { type: String, default: "m2" },
      },
      numberOfUnits: { type: Number },
      numberOfBuilding: { type: Number },
      numberOfFloors: { type: Number },
      buildingDensity: { type: String },
      summary: { type: String },
    },
    amenities: [{ type: String }],
    investor: {
      name: { type: String, required: true },
      logoUrl: { type: String },
      website: { type: String },
    },
    developer: {
      name: { type: String, required: true },
      logoUrl: { type: String },
      website: { type: String },
    },
    media: [
      {
        type: { type: String, enum: ["image", "video"], required: true },
        url: { type: String, required: true },
      },
    ],
    tags: [{ type: String }],
    startDate: { type: String },
    endDate: { type: String },
  },
  { timestamps: true }
);

projectSchema.pre(/^find/, function (next) {
  if (!("_conditions" in this)) return next();
  if (!("isDeleted" in projectSchema.paths)) {
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

const Project =
  mongoose.models.Project ||
  mongoose.model<ProjectDocument>("Project", projectSchema);

export default Project;
