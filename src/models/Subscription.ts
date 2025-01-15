import mongoose, { Document, Schema } from "mongoose";

type Price = {
  value: number;
  currency: string;
};

type SubscriptionDocument = Document & {
  property: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  packageName:
    | "priority_1"
    | "priority_3"
    | "priority_7"
    | "featured_1"
    | "featured_3"
    | "featured_7";
  price: Price;
  startDate: Date;
  endDate: Date;
  isDeleted: boolean;
  status: "pending" | "active" | "expired" | "cancelled";
};

const subscriptionSchema: Schema<SubscriptionDocument> = new Schema(
  {
    property: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    packageName: {
      type: String,
      enum: [
        "priority_1",
        "priority_3",
        "priority_7",
        "featured_1",
        "featured_3",
        "featured_7",
      ],
      required: true,
    },
    price: {
      value: {
        type: Number,
        required: true,
      },
      currency: {
        type: String,
        default: "VND",
        required: true,
      },
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "active", "expired", "cancelled"],
      default: "pending",
      required: true,
    },
  },
  { timestamps: true }
);

subscriptionSchema.pre(/^find/, function (next) {
  if (!("_conditions" in this)) return next();
  if (!("isDeleted" in subscriptionSchema.paths)) {
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

const Subscription =
  mongoose.models.Subscription ||
  mongoose.model<SubscriptionDocument>("Subscription", subscriptionSchema);

export default Subscription;
