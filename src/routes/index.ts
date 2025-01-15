import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
import { sendResponse } from "../helpers/utils";

/* GET HomePage */
router.get("/", (req: Request, res: Response, next: NextFunction) => {
  sendResponse(
    res,
    200,
    true,
    undefined,
    undefined,
    "Welcome to muanhagiatot.com.vn API"
  );
});

/* User API */
import userAPI from "./user.api";
router.use("/users", userAPI);

/* Project API */
import projectAPI from "./project.api";
router.use("/projects", projectAPI);

/* Category API */
import categoryAPI from "./category.api";
router.use("/categories", categoryAPI);

/* Post API */
import postAPI from "./post.api";
router.use("/posts", postAPI);

/* Property API */
import propertyAPI from "./property.api";
router.use("/properties", propertyAPI);

/* Subscription API */
import subscriptionAPI from "./subscription.api";
router.use("/subscriptions", subscriptionAPI);

export default router;
