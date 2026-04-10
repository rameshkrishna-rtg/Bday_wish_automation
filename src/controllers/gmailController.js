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


const ProcessBirthdayWishes = async () => {
    console.log("Birthday cron started", new Date().toISOString());

    //Get today's month and day
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    //Query today's birthdays and remove ther duplicates
    const birthdays = await db.friends.findMany({
        where: {
            AND: [
                { birthMonth: month },
                { birthday: day },
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

    if (birthdays.length === 0) {
        console.log("No birthdays today");
        return {
            message: "No birthdays today", results: []
        };
    }

    console.log("Birthdays found: ", birthdays.length);

    //send email to each user
    const results = [];
    for (const user of birthdays) {

        const htmlContent = `
                <h1>🎂 Happy Birthday, ${user.name}!</h1>
                <p>Hope you are having a wonderful day!</p>`;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Happy Birthday",
            html: htmlContent,
        };

        try {
            await transporter.sendMail(mailOptions);
            console.log("Email sent successfully: ");

            await db.emailLogs.create({
                data: {
                    from: process.env.EMAIL_USER,
                    friend_id: user.id,
                    subject: "Happy Birthday",
                    body: htmlContent,
                    status: "SUCCESS"
                }
            })

            console.log("Email sent successfully: ", user.email);

            results.push({
                email: user.email,
                status: "SUCCESS"
            })

        } catch (error) {
            console.log(`Email not sent for ${user.email}`, error.message)

            await db.emailLogs.create({
                data: {
                    from: process.env.EMAIL_USER,
                    friend_id: user.id,
                    subject: "Happy Birthday",
                    body: htmlContent,
                    status: "FAILED"
                }
            })
            return res.status(500).json({
                status: "error",
                message: "Email sending failed"
            })
        }
    }

    return { results }
}

const sendBirthdayWishes = async (req, res) => {
    try {
        const result = await ProcessBirthdayWishes();

        return res.status(200).json({
            status: "success",
            message: "Birthday wishes sent successfully",
            data: result
        })
    } catch (error) {
        console.log("Send Birthday Wishes Error: ", error.message);

        return res.status(500).json({
            status: "error",
            message: "Internal server error"
        })
    }
}

// setInterval(async () => {
//     try {
//         await ProcessBirthdayWishes();
//     } catch (error) {
//         console.log("Error:", error.message);
//     }
// }, 1000);



cron.schedule("*/1 * * * *", async () => {
    try {
        await ProcessBirthdayWishes();
    } catch (error) {
        console.log("Cron Error: ", error.message);
    }
});

module.exports = { sendBirthdayWishes }


