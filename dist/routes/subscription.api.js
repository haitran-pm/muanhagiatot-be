"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createSubscription_controller_1 = __importDefault(require("../controllers/subscription/createSubscription.controller"));
const getSubscriptions_controller_1 = __importDefault(require("../controllers/subscription/getSubscriptions.controller"));
const getSubscriptionById_controller_1 = __importDefault(require("../controllers/subscription/getSubscriptionById.controller"));
const editSubscription_controller_1 = __importDefault(require("../controllers/subscription/editSubscription.controller"));
const deleteSubscription_controller_1 = __importDefault(require("../controllers/subscription/deleteSubscription.controller"));
const validateSchema_1 = __importDefault(require("../middleware/validateSchema"));
const createSubscription_schema_1 = require("../schemas/subscription/createSubscription.schema");
const getSubscriptions_schema_1 = require("../schemas/subscription/getSubscriptions.schema");
const getSubscriptionById_schema_1 = require("../schemas/subscription/getSubscriptionById.schema");
const editSubscription_schema_1 = require("../schemas/subscription/editSubscription.schema");
const deleteSubscription_schema_1 = require("../schemas/subscription/deleteSubscription.schema");
const router = express_1.default.Router();
router.post("/", (0, validateSchema_1.default)({ body: createSubscription_schema_1.createSubscriptionBodySchema }), createSubscription_controller_1.default); // body
router.get("/", (0, validateSchema_1.default)({ query: getSubscriptions_schema_1.getSubscriptionsQuerySchema }), getSubscriptions_controller_1.default); // query
router.get("/:subscriptionId", (0, validateSchema_1.default)({ params: getSubscriptionById_schema_1.getSubscriptionByIdParamsSchema }), getSubscriptionById_controller_1.default); // params
router.patch("/:subscriptionId", (0, validateSchema_1.default)({
    params: editSubscription_schema_1.editSubscriptionParamsSchema,
    body: editSubscription_schema_1.editSubscriptionBodySchema,
}), editSubscription_controller_1.default); // params; body
router.delete("/:subscriptionId", (0, validateSchema_1.default)({ params: deleteSubscription_schema_1.deleteSubscriptionParamsSchema }), deleteSubscription_controller_1.default); // params
exports.default = router;
