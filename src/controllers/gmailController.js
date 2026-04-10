const cron = require("node-cron");
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

const sendBirthdayWishes = async (req, res) => {
    console.log("Birthday cron started", new Date().toISOString());

    //Get today's month and day
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDay();

    try {
        //Query today's birthdays and remove ther duplicates
        const birthdays = await db.friends.findMany({
            where: {
                AND: [
                    { birthMonth: month },
                    { birthDay: day },
                    {
                        //Reject friends who got already received message
                        emailLogs: {
                            none: {
                                status: "SUCCESS",
                                createdAt: {
                                    gte: new Date(today.setHours(0, 0, 0, 0)),
                                    lt: new Date(today.setHours(23, 59, 59, 999))
                                }

                            }
                        }
                    }
                ]
            }
        });

        if(birthdays.length === 0){
            console.log("No birthdays today");
            return res.status(200).json({
                status: "success",
                message: "No birthdays today"
            })
        }

        console.log("Birthdays found: ", birthdays.length);




    } catch (error) {

    }
}

const sendMail = async (req, res) => {
    try {
        const { from, to, subject, body, attachments } = req.body;

        if (!from || !to || !subject || !body) {
            return res.status(400).json({
                status: "error",
                message: "Please provide all the required fields"
            })
        }

        const friend = await db.friends.findUnique({
            where: {
                email: to
            }
        })

        if (!friend) {
            return res.status(404).json({
                status: "error",
                message: "Friend not found"
            })
        }

        const mailOptions = {
            from: req.body.from,
            to: to,
            subject: subject,
            body: body,
            attachments
        };

        try {
            await transporter.sendMail(mailOptions);
            console.log("Email sent successfully: ");

            await db.emailLogs.create({
                data: {
                    from,
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
            console.log("Email not sent", error.message)

            await db.emailLogs.create({
                data: {
                    from,
                    subject,
                    body,
                    attachments,
                    status: "FAILED"
                }
            })
            return res.status(500).json({
                status: "error",
                message: "Email sending failed"
            })
        }





    } catch (error) {

        console.log("Error sending email: ", error.message);
        return res.status(500).json({
            status: "error",
            message: "Internal server error"
        })

    }
}

module.exports = { sendMail }


