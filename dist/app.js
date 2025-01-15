"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = __importDefault(require("./routes/index"));
const utils_1 = require("./helpers/utils");
dotenv_1.default.config();
const mongoURI = process.env.MONGODB_URI;
if (!mongoURI) {
    throw new Error("Environment variable MONGODB_URI is not defined");
}
const app = (0, express_1.default)();
// Disable ETag generation to prevent 304 responses
app.set("etag", false);
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
// Disable caching for development
app.use((req, res, next) => {
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
mongoose_1.default
    .connect(mongoURI)
    .then(() => console.log(`Database connected at ${mongoURI}`))
    .catch((err) => console.log(err));
app.use("/", index_1.default);
// Catch 404 and forward to error handler
app.use((_req, _res, next) => {
    const err = new utils_1.AppError(404, "Resource not found");
    next(err);
});
/* Initialize error handling */
app.use((err, _req, res, _next) => {
    console.log("ERROR", err);
    (0, utils_1.sendResponse)(res, err.statusCode || 500, false, undefined, err, err.isOperational
        ? err.errorType || "Unknown Error"
        : "Internal Server Error");
});
exports.default = app;
