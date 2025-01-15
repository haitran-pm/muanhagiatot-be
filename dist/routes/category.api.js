"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createCategory_controller_1 = __importDefault(require("../controllers/category/createCategory.controller"));
const getCategories_controller_1 = __importDefault(require("../controllers/category/getCategories.controller"));
const getCategoryById_controller_1 = __importDefault(require("../controllers/category/getCategoryById.controller"));
const editCategory_controller_1 = __importDefault(require("../controllers/category/editCategory.controller"));
const deleteCategory_controller_1 = __importDefault(require("../controllers/category/deleteCategory.controller"));
const validateSchema_1 = __importDefault(require("../middleware/validateSchema"));
const createCategory_schema_1 = require("../schemas/category/createCategory.schema");
const getCategories_schema_1 = require("../schemas/category/getCategories.schema");
const getCategoryById_schema_1 = require("../schemas/category/getCategoryById.schema");
const editCategory_schema_1 = require("../schemas/category/editCategory.schema");
const deleteCategory_schema_1 = require("../schemas/category/deleteCategory.schema");
const router = express_1.default.Router();
router.post("/", (0, validateSchema_1.default)({ body: createCategory_schema_1.createCategoryBodySchema }), createCategory_controller_1.default); // body
router.get("/", (0, validateSchema_1.default)({ query: getCategories_schema_1.getCategoriesQuerySchema }), getCategories_controller_1.default); // query
router.get("/:categoryId", (0, validateSchema_1.default)({ params: getCategoryById_schema_1.getCategoryByIdParamsSchema }), getCategoryById_controller_1.default); // params
router.patch("/:categoryId", (0, validateSchema_1.default)({
    params: editCategory_schema_1.editCategoryParamsSchema,
    body: editCategory_schema_1.editCategoryBodySchema,
}), editCategory_controller_1.default); // params; body
router.delete("/:categoryId", (0, validateSchema_1.default)({ params: deleteCategory_schema_1.deleteCategoryParamsSchema }), deleteCategory_controller_1.default); // params
exports.default = router;
