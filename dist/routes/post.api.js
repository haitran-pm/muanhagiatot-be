"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createPost_controller_1 = __importDefault(require("../controllers/post/createPost.controller"));
const getPosts_controller_1 = __importDefault(require("../controllers/post/getPosts.controller"));
const getPostById_controller_1 = __importDefault(require("../controllers/post/getPostById.controller"));
const editPost_controller_1 = __importDefault(require("../controllers/post/editPost.controller"));
const deletePost_controller_1 = __importDefault(require("../controllers/post/deletePost.controller"));
const validateSchema_1 = __importDefault(require("../middleware/validateSchema"));
const createPost_schema_1 = require("../schemas/post/createPost.schema");
const getPosts_schema_1 = require("../schemas/post/getPosts.schema");
const getPostById_schema_1 = require("../schemas/post/getPostById.schema");
const editPost_schema_1 = require("../schemas/post/editPost.schema");
const deletePost_schema_1 = require("../schemas/post/deletePost.schema");
const router = express_1.default.Router();
router.post("/", (0, validateSchema_1.default)({ body: createPost_schema_1.createPostBodySchema }), createPost_controller_1.default); // body
router.get("/", (0, validateSchema_1.default)({ query: getPosts_schema_1.getPostsQuerySchema }), getPosts_controller_1.default); // query
router.get("/:postId", (0, validateSchema_1.default)({ params: getPostById_schema_1.getPostByIdParamsSchema }), getPostById_controller_1.default); // params
router.patch("/:postId", (0, validateSchema_1.default)({
    params: editPost_schema_1.editPostParamsSchema,
    body: editPost_schema_1.editPostBodySchema,
}), editPost_controller_1.default); // params, body
router.delete("/:postId", (0, validateSchema_1.default)({ params: deletePost_schema_1.deletePostParamsSchema }), deletePost_controller_1.default); // params
exports.default = router;
