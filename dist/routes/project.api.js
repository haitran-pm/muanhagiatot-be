"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createProject_controller_1 = __importDefault(require("../controllers/project/createProject.controller"));
const getProjects_controller_1 = __importDefault(require("../controllers/project/getProjects.controller"));
const getProjectById_controller_1 = __importDefault(require("../controllers/project/getProjectById.controller"));
const editProject_controller_1 = __importDefault(require("../controllers/project/editProject.controller"));
const deleteProject_controller_1 = __importDefault(require("../controllers/project/deleteProject.controller"));
const validateSchema_1 = __importDefault(require("../middleware/validateSchema"));
const createProject_schema_1 = require("../schemas/project/createProject.schema");
const getProjects_schema_1 = require("../schemas/project/getProjects.schema");
const getProjectById_schema_1 = require("../schemas/project/getProjectById.schema");
const editProject_schema_1 = require("../schemas/project/editProject.schema");
const deleteProject_schema_1 = require("../schemas/project/deleteProject.schema");
const router = express_1.default.Router();
router.post("/", (0, validateSchema_1.default)({ body: createProject_schema_1.createProjectBodySchema }), createProject_controller_1.default); // body
router.get("/", (0, validateSchema_1.default)({ query: getProjects_schema_1.getProjectsQuerySchema }), getProjects_controller_1.default); // query
router.get("/:projectId", (0, validateSchema_1.default)({ params: getProjectById_schema_1.getProjectByIdParamsSchema }), getProjectById_controller_1.default); // params
router.patch("/:projectId", (0, validateSchema_1.default)({
    params: editProject_schema_1.editProjectParamsSchema,
    body: editProject_schema_1.editProjectBodySchema,
}), editProject_controller_1.default); // params, body
router.delete("/:projectId", (0, validateSchema_1.default)({ params: deleteProject_schema_1.deleteProjectParamsSchema }), deleteProject_controller_1.default); // params
exports.default = router;
