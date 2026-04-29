// const nodemailer = require("nodemailer")
import nodemailer from "nodemailer"
export const sendEmail = ({ email, subject, message }: { email: string, subject: string, message: string }) => new Promise(async (resolve, reject) => {
    try {
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASS }
        })
        await transport.sendMail({
            to: email,
            subject: subject,
            html: message
        })
        resolve("email send success")

    } catch (error) {
        console.log(error)
        reject("unable to send email")
    }
})