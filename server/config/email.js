require("dotenv").config();
const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendEmailWithLink = async (to, subject, linkText, linkUrl) => {
  try {
    const mailOptions = {
      from: `"Support Team" <${process.env.EMAIL_USER}>`,
      replyTo: process.env.EMAIL_USER,
      to,
      subject,
      html: `
        <h2>${subject}</h2>
        <p>Click the button below to continue</p>
        <a href="${linkUrl}" style="display:inline-block;padding:10px 20px;color:#fff;background:blue;text-decoration:none;border-radius:5px;">
          ${linkText}
        </a>
        <p>If the button doesn't work, copy this link:</p>
        <p>${linkUrl}</p>
         <p>${linkUrl}</p>

      `,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("✅ Email sent:", to, info.messageId);

    return { success: true, info };
  } catch (error) {
    console.error("❌ Failed sending email:", error);

    return { success: false, error };
  }
};
module.exports = {
  transporter,
  sendEmailWithLink
};
