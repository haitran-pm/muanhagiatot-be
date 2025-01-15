"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createUser_controller_1 = __importDefault(require("../controllers/user/createUser.controller"));
const getUsers_controller_1 = __importDefault(require("../controllers/user/getUsers.controller"));
const getUserById_controller_1 = __importDefault(require("../controllers/user/getUserById.controller"));
const editUser_controller_1 = __importDefault(require("../controllers/user/editUser.controller"));
const deleteUser_controller_1 = __importDefault(require("../controllers/user/deleteUser.controller"));
const validateSchema_1 = __importDefault(require("../middleware/validateSchema"));
const createUser_schema_1 = require("../schemas/user/createUser.schema");
const getUsers_schema_1 = require("../schemas/user/getUsers.schema");
const getUserById_schema_1 = require("../schemas/user/getUserById.schema");
const editUser_schema_1 = require("../schemas/user/editUser.schema");
const deleteUser_schema_1 = require("../schemas/user/deleteUser.schema");
const router = express_1.default.Router();
router.post("/", (0, validateSchema_1.default)({ body: createUser_schema_1.createUserBodySchema }), createUser_controller_1.default); // body
router.get("/", (0, validateSchema_1.default)({ query: getUsers_schema_1.getUsersQuerySchema }), getUsers_controller_1.default); // query
router.get("/:userId", (0, validateSchema_1.default)({ params: getUserById_schema_1.getUserByIdParamsSchema }), getUserById_controller_1.default); // params
router.patch("/:userId", (0, validateSchema_1.default)({ params: editUser_schema_1.editUserParamsSchema, body: editUser_schema_1.editUserBodySchema }), editUser_controller_1.default); // params; body
router.delete("/:userId", (0, validateSchema_1.default)({ params: deleteUser_schema_1.deleteUserParamsSchema }), deleteUser_controller_1.default); // params
exports.default = router;
