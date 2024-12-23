import nodemailer from "nodemailer"

// Setup SMTP transporter
export const transporter = nodemailer.createTransport({
  service: 'gmail', // Use the email provider of your choice
  auth: {
    user: "corneliusdevs@gmail.com",
    pass: "uacopxqpdzzxjopf" // For Gmail, use App Passwords for security
  }
});
