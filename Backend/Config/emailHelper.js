const nodemailer = require('nodemailer');
const fs = require("fs");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();

const { SENDGRID_API_KEY } = process.env;

function replaceContent(content, creds) {
    let allkeysArr = Object.keys(creds);
    allkeysArr.forEach(function (key) {
        content = content.replace(`#{${key}}`, creds[key]);
    });
    return content;
}

async function emailHelper(templateName, receiverEmail, creds) {
    try {
        // Load template
        const templatePath = path.join(__dirname, templateName);
        let content = await fs.promises.readFile(templatePath, "utf-8");

        // Email details
        const emailDetails = {
            to: receiverEmail,
            // 👇 must be a verified sender in SendGrid dashboard
            from: 'pramodkumaras143@gmail.com',
            subject: 'Mail from BookMyShow',
            text: `Hi ${creds.name}, this is your reset OTP: ${creds.otp}`,
            html: replaceContent(content, creds),
        };

        // SendGrid SMTP config
        const transportDetails = {
            host: 'smtp.sendgrid.net',
            port: 587,
            secure: false, // TLS
            auth: {
                user: "apikey", // must literally be "apikey"
                pass: SENDGRID_API_KEY
            }
        };

        const transporter = nodemailer.createTransport(transportDetails);

        // Verify connection before sending
        await transporter.verify();
        console.log("SMTP connection verified.");

        // Send mail
        const info = await transporter.sendMail(emailDetails);
        console.log("Email sent:", info.messageId);

    } catch (err) {
        console.error("Error sending email:", err);
    }
}

module.exports = emailHelper;
