
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendMail = async (req, res) => {
    try {
        const { from, to, subject, text } = req.body;

        if (!from || !to || !subject || !text) {
            return res.status(400).json({
                status: "error",
                message: "Please provide all the required fields"
            })
        }

        const mailOptions = {
            from: from,
            to: to,
            subject: subject,
            text: text
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("Error sending email: ", error.message);
                res.status(500).json({
                    status: "error",
                    message: "Internal server error"
                })
            } else {
                res.status(200).json({
                    status: "success",
                    message: "Email sent successfully!"
                })
            }
        })

    } catch (error) {

        console.log("Error sending email: ", error);
        return res.status(500).json({
            status: "error",
            message: "Internal server error"
        })

    }
}

module.exports = { sendMail }


