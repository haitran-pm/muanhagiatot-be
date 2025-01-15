"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../helpers/utils");
const Property_1 = __importDefault(require("../../models/Property"));
const getProperties = async (req, res, next) => {
    try {
        // Pagination
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        // Extract filter
        const { title, description, transactionType, type, "location.address": address, "location.district": district, "location.city": city, "location.ward": ward, "location.country": country, "price.value": priceRange, status, author, tags, "features.bedrooms": bedroomsRange, "features.bathrooms": bathroomsRange, "features.floorArea.value": floorAreaRange, project, } = req.query;
        // Build filter
        const filter = {};
        if (title)
            filter.title = { $regex: title, $options: "i" };
        if (description)
            filter.description = { $regex: description, $options: "i" };
        if (type)
            filter.type = type;
        if (transactionType)
            filter.transactionType = transactionType;
        if (address)
            filter["location.address"] = { $regex: address, $options: "i" };
        if (city)
            filter["location.city"] = city;
        if (district)
            filter["location.district"] = district;
        if (ward)
            filter["location.ward"] = ward;
        if (country)
            filter["location.country"] = country;
        if (status)
            filter.status = status;
        if (author)
            filter.author = author;
        if (tags && typeof tags === "string")
            filter.tags = {
                $in: tags.split(",").map((item) => item.trim()),
            };
        if (project)
            filter.project = project;
        // priceRange, bedroomsRange, bathroomsRange, floorAreaRange
        if (priceRange) {
            // Ex: ?price.value=100000-500000
            const [minPrice, maxPrice] = priceRange
                .split("-")
                .map(Number);
            filter["price.value"] = {
                ...(minPrice && { $gte: minPrice }),
                ...(maxPrice && { $lte: maxPrice }),
            };
        }
        if (bedroomsRange) {
            // Ex: features.bedrooms=2-4
            const [minBedrooms, maxBedrooms] = bedroomsRange
                .split("-")
                .map(Number);
            filter["features.bedrooms"] = {
                ...(minBedrooms && { $gte: minBedrooms }),
                ...(maxBedrooms && { $lte: maxBedrooms }),
            };
        }
        if (bathroomsRange) {
            // Ex: features.bathrooms=1-2
            const [minBathrooms, maxBathrooms] = bathroomsRange
                .split("-")
                .map(Number);
            filter["features.bathrooms"] = {
                ...(minBathrooms && { $gte: minBathrooms }),
                ...(maxBathrooms && { $lte: maxBathrooms }),
            };
        }
        if (floorAreaRange) {
            // Ex: features.floorArea.value=50-150
            const [minFloorArea, maxFloorArea] = floorAreaRange
                .split("-")
                .map(Number);
            filter["features.floorArea.value"] = {
                ...(minFloorArea && { $gte: minFloorArea }),
                ...(maxFloorArea && { $lte: maxFloorArea }),
            };
        }
        // Find results
        const listOfFound = await Property_1.default.find(filter)
            .select("-isDeleted -__v")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
        // Send response
        (0, utils_1.sendResponse)(res, 200, true, listOfFound, undefined, "List of properties found successfully");
    }
    catch (err) {
        next(err);
    }
};
exports.default = getProperties;
