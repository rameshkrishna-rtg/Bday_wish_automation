
const nodemailer = require("nodemailer");
require("dotenv").config();
const db = require("../configs/dbConfig");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendMail = async (req, res) => {
    try {
        const { from, to, subject, body, attachments } = req.body;

        if (!from || !to || !subject || !body) {
            return res.status(400).json({
                status: "error",
                message: "Please provide all the required fields"
            })
        }

        const mailOptions = {
            from: req.body.from,
            to: to,
            subject: subject,
            body: body,
            attachments
        };
        const sendmail = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully: ");

        await db.emailLogs.create({
            data: {
                from,
                to,
                subject,
                body,
                attachments,
                status: "SUCCESS"
            }
        })
        return res.status(200).json({
            status: "success",
            message: "Email sent successfully!"
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


