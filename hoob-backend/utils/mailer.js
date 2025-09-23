import nodemailer from "nodemailer";

// Create transporter with IPv4 and TLS
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT), // ensure numeric
  secure: false, // Gmail uses TLS on 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Gmail App Password
  },
  family: 4, // force IPv4
  tls: {
    rejectUnauthorized: false, // avoid certificate issues
  },
  pool: true, // use pooled connections for multiple emails
  maxConnections: 5,
  maxMessages: 100,
});

// Verify transporter on server start
transporter.verify((error, success) => {
  if (error) {
    console.error("Email transporter connection error:", error);
  } else {
    console.log("Email transporter is ready to send messages");
  }
});

/**
 * sendEmail - Sends an email with retries
 * @param {string} to - Recipient email
 * @param {string} subject - Email subject
 * @param {string} text - Plain text content
 * @param {string} html - HTML content
 * @param {number} retries - Number of retries (default 3)
 */
export const sendEmail = async (to, subject, text = "", html = "", retries = 3) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const info = await transporter.sendMail({
        from: `"HOOB" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        text,
        html,
      });
      console.log(`Email sent to ${to} (Message ID: ${info.messageId})`);
      return info;
    } catch (error) {
      console.error(`Attempt ${attempt} - Error sending email to ${to}:`, error);
      if (attempt === retries) throw error;
      await new Promise((res) => setTimeout(res, 1000 * attempt)); // exponential backoff
    }
  }
};
