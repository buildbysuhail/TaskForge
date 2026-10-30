import "dotenv/config";
import nodemailer from "nodemailer";

// const email = process.env.EMAIL_USER;
// const password = process.env.EMAIL_PASS;

// console.log("Email configured:", Boolean(email));
// console.log("Email username:", email);
// console.log("Password configured:", Boolean(password));
// console.log("Password length:", password?.length ?? 0);
// console.log("Password contains spaces:", password?.includes(" ") ?? false);

const testEmail = async () => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        console.log("Checking Gmail SMTP connection...");

        await transporter.verify();

        console.log("Gmail SMTP connection successful!");

        const info = await transporter.sendMail({
            from: {
                name: "TaskForge",
                address: process.env.EMAIL_USER,
            },
            to: "suhailthenoble@gmail.com",
            subject: "TaskForge - Nodemailer Test",
            text: "Success! Your TaskForge backend can send emails using Nodemailer and Gmail.",
            html: `
                <h2>TaskForge Email Test</h2>
                <h3>Welcome Suhail</h3>
                <p>Success! Your backend can send emails using Nodemailer and Gmail.</p>
            `,
        });

        console.log("Test email sent successfully.");
        console.log("Message ID:", info.messageId);
    } catch (error) {
        console.error("Email test failed:", error.message);
    }
};

testEmail();
