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
const projectSchema = new mongoose_1.Schema({
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
}, { timestamps: true });
projectSchema.pre(/^find/, function (next) {
    if (!("_conditions" in this))
        return next();
    if (!("isDeleted" in projectSchema.paths)) {
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
const Project = mongoose_1.default.models.Project ||
    mongoose_1.default.model("Project", projectSchema);
exports.default = Project;
