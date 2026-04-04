
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});




transporter.sendMail(mailOptions, (error,info)=> {
    if(error){
        console.log("Error sending email: ",error);
    } else {
        console.log("Email sent successfully!", info.response)
    }
})
