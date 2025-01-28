"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmailWithCodeAndLink = sendEmailWithCodeAndLink;
exports.sendLoginCredentialsToEmailService = sendLoginCredentialsToEmailService;
const nodemailer_1 = require("../../lib/nodemailer");
const crypto_1 = __importDefault(require("crypto"));
const saveTokenService_1 = require("./saveTokenService");
// Generate 6-digit random code
function generateCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}
// Generate expiring link (e.g., with a unique token)
function generateExpiringLink(expiryInMins) {
    const token = crypto_1.default.randomBytes(16).toString('hex');
    const expiration = Date.now() + expiryInMins * 60 * 1000; // expires in 15 minutes
    return { token, expiration };
}
// Send email function
function sendEmailWithCodeAndLink(recepientEmail, tokenType) {
    return __awaiter(this, void 0, void 0, function* () {
        const code = generateCode();
        const { token, expiration } = generateExpiringLink(15);
        // Save the token and expiration time in your database 
        const savedToken = yield (0, saveTokenService_1.saveTokenService)(recepientEmail, token, expiration, code, tokenType);
        if (!savedToken) {
            throw new Error(`could not save token in database `);
        }
        // Define email content
        const mailOptions = {
            from: process.env.ROOT_USER_EMAIL,
            to: recepientEmail,
            subject: 'WORD SANCTUARY SYSTEMS - Your verification code and link',
            html: `
        <p>Here is your 6-digit code: <strong>${code}</strong></p>
        <p>This code will expire in 15 minutes.</p>
        <p>Click the following link to verify your account (expires in 15 minutes):</p>
        <p><a href=${process.env.CENTRAL_SYSTEMS_FRONTEND_URL}/accept-invite/verify?token=${token}">Accept Invite</a></p>
      `
        };
        try {
            const info = yield nodemailer_1.transporter.sendMail(mailOptions);
            console.log('Email sent: ' + info.response);
            return info;
        }
        catch (error) {
            console.error('Error sending email: ', error);
            return null;
        }
    });
}
// Send email function
function sendLoginCredentialsToEmailService(recepientEmail, tokenType) {
    return __awaiter(this, void 0, void 0, function* () {
        const code = generateCode();
        const { token, expiration } = generateExpiringLink(15);
        // Save the token and expiration time in your database 
        const savedToken = yield (0, saveTokenService_1.saveTokenService)(recepientEmail, token, expiration, code, tokenType);
        if (!savedToken) {
            throw new Error(`could not save token in database `);
        }
        // Define email content
        const mailOptions = {
            from: process.env.ROOT_USER_EMAIL,
            to: recepientEmail,
            subject: 'WORD SANCTUARY SYSTEMS - Your verification code and link',
            html: `
        <h2>Login Credentials</h2>
        <p>Here is your 6-digit code: <strong>${code}</strong></p>
        <p>This code will expire in 15 minutes.</p>
        <p>Click the following link to login to  your account (expires in 15 minutes):</p>
      `
        };
        try {
            const info = yield nodemailer_1.transporter.sendMail(mailOptions);
            console.log('Login Email sent: ' + info.response);
            return info;
        }
        catch (error) {
            console.error('Error sending Login email: ', error);
            return null;
        }
    });
}
