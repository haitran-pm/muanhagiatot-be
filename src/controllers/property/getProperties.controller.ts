import { Request, Response, NextFunction } from "express";
import { sendResponse } from "../../helpers/utils";
import Property from "../../models/Property";
import { GetPropertiesQueryType } from "../../schemas/property/getProperties.schema";

const getProperties = async (
  req: Request<unknown, unknown, unknown, GetPropertiesQueryType>,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract filter
    const {
      title,
      description,
      transactionType,
      type,
      location,
      minPrice,
      maxPrice,
      status,
      author,
      tags,
      "features.bedrooms": bedroomsRange,
      "features.bathrooms": bathroomsRange,
      "features.floorArea.value": floorAreaRange,
      project,
      page,
      limit,
    } = req.query;

    const skip = (page - 1) * limit;

    // Build filter
    const filter: { [key: string]: any } = {};
    if (title) filter.title = { $regex: title, $options: "i" };
    if (description)
      filter.description = { $regex: description, $options: "i" };
    if (type) filter.type = type;
    if (transactionType) filter.transactionType = transactionType;
    if (location) {
      const { address, district, city, ward, country } = location;
      filter.location = {};
      if (address) filter.location.address = { $regex: address, $options: "i" };
      if (city) filter.location.city = city;
      if (district) filter.location.district = district;
      if (ward) filter.location.ward = ward;
      if (country) filter.location.country = country;
    }

    if (status) filter.status = status;
    if (author) filter.author = author;
    if (tags && typeof tags === "string")
      filter.tags = {
        $in: tags.split(",").map((item) => item.trim()),
      };
    if (project) filter.project = project;
    // priceRange, bedroomsRange, bathroomsRange, floorAreaRange
    if (priceRange) {
      // Ex: ?price.value=100000-500000
      const [minPrice, maxPrice] = (priceRange as string)
        .split("-")
        .map(Number);
      filter["price.value"] = {
        ...(minPrice && { $gte: minPrice }),
        ...(maxPrice && { $lte: maxPrice }),
      };
    }
    if (bedroomsRange) {
      // Ex: features.bedrooms=2-4
      const [minBedrooms, maxBedrooms] = (bedroomsRange as string)
        .split("-")
        .map(Number);
      filter["features.bedrooms"] = {
        ...(minBedrooms && { $gte: minBedrooms }),
        ...(maxBedrooms && { $lte: maxBedrooms }),
      };
    }
    if (bathroomsRange) {
      // Ex: features.bathrooms=1-2
      const [minBathrooms, maxBathrooms] = (bathroomsRange as string)
        .split("-")
        .map(Number);
      filter["features.bathrooms"] = {
        ...(minBathrooms && { $gte: minBathrooms }),
        ...(maxBathrooms && { $lte: maxBathrooms }),
      };
    }
    if (floorAreaRange) {
      // Ex: features.floorArea.value=50-150
      const [minFloorArea, maxFloorArea] = (floorAreaRange as string)
        .split("-")
        .map(Number);
      filter["features.floorArea.value"] = {
        ...(minFloorArea && { $gte: minFloorArea }),
        ...(maxFloorArea && { $lte: maxFloorArea }),
      };
    }
    // Find results
    const listOfFound = await Property.find(filter)
      .select("-isDeleted -__v")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    // Send response
    sendResponse(
      res,
      200,
      true,
      listOfFound,
      undefined,
      "List of properties found successfully"
    );
  } catch (err) {
    next(err);
  }
};

export default getProperties;
