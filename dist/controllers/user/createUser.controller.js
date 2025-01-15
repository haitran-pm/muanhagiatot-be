"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const utils_1 = require("../../helpers/utils");
const User_1 = __importDefault(require("../../models/User"));
const createUser = async (req, res, next) => {
    try {
        const { password, ...otherData } = req.body;
        // Hash the password
        const salt = await bcryptjs_1.default.genSalt(10);
        const hashedPassword = await bcryptjs_1.default.hash(password, salt);
        // Update hashedPassword to new user object
        const newUser = { ...otherData, password: hashedPassword };
        const created = await User_1.default.create(newUser);
        (0, utils_1.sendResponse)(res, 201, true, created, undefined, "User created successfully");
    }
    catch (err) {
        next(err);
    }
};
exports.default = createUser;
