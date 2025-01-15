import express, { Request, Response, NextFunction } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import indexRouter from "./routes/index";
import { sendResponse, AppError } from "./helpers/utils";

dotenv.config();

const mongoURI = process.env.MONGODB_URI;
if (!mongoURI) {
  throw new Error("Environment variable MONGODB_URI is not defined");
}

const app = express();

// Disable ETag generation to prevent 304 responses
app.set("etag", false);

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Disable caching for development
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Cache-Control", "no-store");
  next();
});

// // Prevent loading favicon.ico
// app.use("/", (req: Request, res: Response, next: NextFunction): void => {
//   if (req.originalUrl && req.originalUrl.split("/").pop() === "favicon.ico") {
//     res.sendStatus(204);
//   } else {
//     next();
//   }
// });

mongoose
  .connect(mongoURI)
  .then(() => console.log(`Database connected at ${mongoURI}`))
  .catch((err) => console.log(err));

app.use("/", indexRouter);

// Catch 404 and forward to error handler
app.use((_req: Request, _res: Response, next: NextFunction) => {
  const err = new AppError(404, "Resource not found");
  next(err);
});

/* Initialize error handling */
app.use((err: AppError, _req: Request, res: Response, _next: NextFunction) => {
  console.log("ERROR", err);
  sendResponse(
    res,
    err.statusCode || 500,
    false,
    undefined,
    err,
    err.isOperational
      ? err.errorType || "Unknown Error"
      : "Internal Server Error"
  );
});

export default app;
