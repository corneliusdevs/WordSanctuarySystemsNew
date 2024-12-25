import nodemailer from "nodemailer"

// Setup SMTP transporter
export const transporter = nodemailer.createTransport({
  service: 'gmail', // Use the email provider of your choice
  auth: {
    user: process.env.ROOT_USER_EMAIL,
    pass: process.env.ROOT_USER_PASSWORD // For Gmail, use App Passwords for security
  }
});
