import { transporter } from "../../lib/nodemailer";
import crypto from "crypto"
import { saveTokenService } from "./saveTokenService";

// Generate 6-digit random code
function generateCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
  
  // Generate expiring link (e.g., with a unique token)
  function generateExpiringLink() {
    const token = crypto.randomBytes(16).toString('hex');
    const expiration = Date.now() + 20 * 60 * 1000; // expires in 20 minutes
    return { token, expiration };
  }
  
  // Send email function
  export async function sendEmailWithCodeAndLink(recepientEmail:string) {
    const code = generateCode();
    const { token, expiration } = generateExpiringLink();
  
    // Save the token and expiration time in your database 

    const savedToken = await saveTokenService(recepientEmail, token, expiration)

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
        <p>Click the following link to verify your account (expires in 20 minutes):</p>
        <p><a href="http://localhost:5000/verify?token=${token}">Verify your account</a></p>
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
  