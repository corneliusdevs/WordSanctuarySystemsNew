import { transporter } from "../../lib/nodemailer";
import crypto from "crypto"
import { saveTokenService, TokenTypes } from "./saveTokenService";

// Generate 6-digit random code
function generateCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
  
  // Generate expiring link (e.g., with a unique token)
  function generateExpiringLink(expiryInMins: number) {
    const token = crypto.randomBytes(16).toString('hex');
    const expiration = Date.now() + expiryInMins * 60 * 1000; // expires in 15 minutes
    return { token, expiration };
  }
  
  // Send email function
  export async function sendEmailWithCodeAndLink(recepientEmail:string, tokenType:TokenTypes) {
    const code = generateCode();
    const { token, expiration } = generateExpiringLink(15);
  
    // Save the token and expiration time in your database 

    const savedToken = await saveTokenService(recepientEmail, token, expiration, code, tokenType)

    if(!savedToken){
        throw new Error(`could not save token in database `)
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
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);

      return info
    } catch (error) {
      console.error('Error sending email: ', error)
      return null
    }
  }
  
   // Send email function
   export async function sendLoginCredentialsToEmailService(recepientEmail:string, tokenType:TokenTypes) {
    const code = generateCode();
    const { token, expiration } = generateExpiringLink(15);
  
    // Save the token and expiration time in your database 

    const savedToken = await saveTokenService(recepientEmail, token, expiration, code, tokenType)

    if(!savedToken){
        throw new Error(`could not save token in database `)
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
      const info = await transporter.sendMail(mailOptions);
      console.log('Login Email sent: ' + info.response);

      return info
    } catch (error) {
      console.error('Error sending Login email: ', error)
      return null
    }
  } 