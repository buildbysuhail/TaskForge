
import crypto from "crypto";

const generateVerificationToken = () => {
    // Generate a cryptographically secure random token
    const rawToken = crypto.randomBytes(32).toString("hex");

    // Hash the token before storing it in the database
    const hashedToken = crypto
        .createHash("sha256")
        .update(rawToken)
        .digest("hex");

    // Set the token to expire after 15 minutes
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    return {
        rawToken,
        hashedToken,
        expiresAt
    };
};

export default generateVerificationToken;
