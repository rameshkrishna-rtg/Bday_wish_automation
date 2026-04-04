
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
const mailOptions = {
    from: "rameshkrishnartg@gamil.com",
    to: "iamkrish423@gmail.com",
    subject: "Hello from rtg",
    text: "This is a test mail"   
};




