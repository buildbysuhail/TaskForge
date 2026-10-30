
import "dotenv/config";
import nodemailer from "nodemailer";

// ==========================================
// Previous Resend implementation (preserved)
// ==========================================

// import { Resend } from "resend";

// const apiKey = process.env.RESEND_API_KEY;

// if (!apiKey) {
//     throw new Error(
//         "RESEND_API_KEY is missing. Check your backend/.env file."
//     );
// }

// const resend = new Resend(apiKey);

// const sendEmail = async ({ to, subject, html }) => {
//     try {
//         const { data, error } = await resend.emails.send({
//             from: process.env.EMAIL_FROM,
//             to,
//             subject,
//             html
//         });

//         if (error) {
//             throw new Error(error.message);
//         }

//         return data;
//     } catch (error) {
//         console.error("Email sending failed:", error.message);
//         throw error;
//     }
// };

// export default sendEmail;


// ==========================================
// Nodemailer implementation
// ==========================================

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error(
        "EMAIL_USER or EMAIL_PASS is missing. Check your backend/.env file."
    );
}

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendEmail = async ({ to, subject, html }) => {
    try {
        const info = await transporter.sendMail({
            from: {
                name: "TaskForge",
                address: process.env.EMAIL_USER,
            },
            to,
            subject,
            html,
        });

        console.log("Email sent successfully:", info.messageId);

        return info;

    } catch (error) {
        console.error("Email sending failed:", error.message);
        throw error;
    }
};

export default sendEmail;
