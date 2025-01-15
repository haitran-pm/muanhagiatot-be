"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createProperty_controller_1 = __importDefault(require("../controllers/property/createProperty.controller"));
const getProperties_controller_1 = __importDefault(require("../controllers/property/getProperties.controller"));
const getPropertyById_controller_1 = __importDefault(require("../controllers/property/getPropertyById.controller"));
const editProperty_controller_1 = __importDefault(require("../controllers/property/editProperty.controller"));
const deleteProperty_controller_1 = __importDefault(require("../controllers/property/deleteProperty.controller"));
const validateSchema_1 = __importDefault(require("../middleware/validateSchema"));
const createProperty_schema_1 = require("../schemas/property/createProperty.schema");
const getProperties_schema_1 = require("../schemas/property/getProperties.schema");
const getPropertyById_schema_1 = require("../schemas/property/getPropertyById.schema");
const editProperty_schema_1 = require("../schemas/property/editProperty.schema");
const deleteProperty_schema_1 = require("../schemas/property/deleteProperty.schema");
const router = express_1.default.Router();
router.post("/", (0, validateSchema_1.default)({ body: createProperty_schema_1.createPropertyBodySchema }), createProperty_controller_1.default); // body
router.get("/", (0, validateSchema_1.default)({ query: getProperties_schema_1.getPropertiesQuerySchema }), getProperties_controller_1.default); // query
router.get("/:propertyId", (0, validateSchema_1.default)({ params: getPropertyById_schema_1.getPropertyByIdParamsSchema }), getPropertyById_controller_1.default); // params
router.patch("/:propertyId", (0, validateSchema_1.default)({
    params: editProperty_schema_1.editPropertyParamsSchema,
    body: editProperty_schema_1.editPropertyBodySchema,
}), editProperty_controller_1.default); // params, body
router.delete("/:propertyId", (0, validateSchema_1.default)({ params: deleteProperty_schema_1.deletePropertyParamsSchema }), deleteProperty_controller_1.default); // params
exports.default = router;
