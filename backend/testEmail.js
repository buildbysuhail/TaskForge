
import "dotenv/config";
import sendEmail from "./services/emailService.js";

const testEmail = async () => {
    try {
        const result = await sendEmail({
            to: "suhailthenoble@gmail.com",
            subject: "TaskForge Email Test",
            html: `
                <h2>Hello from TaskForge!</h2>
                <p>Your Resend email integration is working.</p>
            `
        });

        console.log("Email submitted successfully:", result);
    } catch (error) {
        console.error("Email test failed:", error.message);
        process.exitCode = 1;
    }
};

testEmail();
