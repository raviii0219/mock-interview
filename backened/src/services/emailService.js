const nodeemailer = require("nodemailer");
const transporter = nodeemailer.createTransport({
    services: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});
const sendEmail = async (email) => {
    await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: "Interview Completed",
        text: "Your interview is completed",
    });
};
module.exports = sendEmail;