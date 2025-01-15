"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const propertySchema = new mongoose_1.Schema({
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
        type: mongoose_1.Schema.Types.ObjectId,
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
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Project",
        required: true,
    },
}, { timestamps: true });
propertySchema.pre(/^find/, function (next) {
    if (!("_conditions" in this))
        return next();
    if (!("isDeleted" in propertySchema.paths)) {
        delete this["_conditions"]["all"];
        return next();
    }
    if (!("all" in this["_conditions"])) {
        this["_conditions"].isDeleted = false;
    }
    else {
        delete this["_conditions"]["all"];
    }
    next();
});
const Property = mongoose_1.default.models.Property ||
    mongoose_1.default.model("Property", propertySchema);
exports.default = Property;
