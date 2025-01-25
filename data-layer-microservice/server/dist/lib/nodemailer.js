"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
// Setup SMTP transporter
exports.transporter = nodemailer_1.default.createTransport({
    service: 'gmail', // Use the email provider of your choice
    auth: {
        user: process.env.ROOT_USER_EMAIL,
        pass: process.env.ROOT_USER_PASSWORD // For Gmail, use App Passwords for security
    }
});
