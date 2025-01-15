"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../helpers/utils");
const Project_1 = __importDefault(require("../../models/Project"));
const getProjects = async (req, res, next) => {
    try {
        // Pagination
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        // Extract filter
        const { name, description, "location.address": address, "location.district": district, "location.city": city, "location.ward": ward, "location.country": country, type, status, amenities, "investor.name": investorName, "developer.name": developerName, tags, } = req.query;
        // Build filter
        const filter = {};
        if (name)
            filter.name = { $regex: name, $options: "i" };
        if (description)
            filter.description = { $regex: description, $options: "i" };
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
        if (type)
            filter.type = type;
        if (status)
            filter.status = status;
        if (amenities && typeof amenities === "string")
            filter.amenities = {
                $in: amenities.split(",").map((item) => item.trim()),
            };
        if (investorName)
            filter["investor.name"] = { $regex: investorName, $options: "i" };
        if (developerName)
            filter["developer.name"] = { $regex: developerName, $options: "i" };
        if (tags && typeof tags === "string")
            filter.tags = {
                $in: tags.split(",").map((item) => item.trim()),
            };
        // Find results
        const listOfFound = await Project_1.default.find(filter)
            .select("-isDeleted -__v")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
        // Send response
        (0, utils_1.sendResponse)(res, 200, true, listOfFound, undefined, "List of projects found successfully");
    }
    catch (err) {
        next(err);
    }
};
exports.default = getProjects;
