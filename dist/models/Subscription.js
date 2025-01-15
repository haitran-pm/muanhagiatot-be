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
const subscriptionSchema = new mongoose_1.Schema({
    property: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Property",
        required: true,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
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
}, { timestamps: true });
subscriptionSchema.pre(/^find/, function (next) {
    if (!("_conditions" in this))
        return next();
    if (!("isDeleted" in subscriptionSchema.paths)) {
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
const Subscription = mongoose_1.default.models.Subscription ||
    mongoose_1.default.model("Subscription", subscriptionSchema);
exports.default = Subscription;
