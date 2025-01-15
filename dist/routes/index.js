"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const utils_1 = require("../helpers/utils");
/* GET HomePage */
router.get("/", (req, res, next) => {
    (0, utils_1.sendResponse)(res, 200, true, undefined, undefined, "Welcome to muanhagiatot.com.vn API");
});
/* User API */
const user_api_1 = __importDefault(require("./user.api"));
router.use("/users", user_api_1.default);
/* Project API */
const project_api_1 = __importDefault(require("./project.api"));
router.use("/projects", project_api_1.default);
/* Category API */
const category_api_1 = __importDefault(require("./category.api"));
router.use("/categories", category_api_1.default);
/* Post API */
const post_api_1 = __importDefault(require("./post.api"));
router.use("/posts", post_api_1.default);
/* Property API */
const property_api_1 = __importDefault(require("./property.api"));
router.use("/properties", property_api_1.default);
/* Subscription API */
const subscription_api_1 = __importDefault(require("./subscription.api"));
router.use("/subscriptions", subscription_api_1.default);
exports.default = router;
