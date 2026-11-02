import crypto from "crypto";

import Team from "../models/Team.js";
import TeamMembership from "../models/TeamMembership.js";
import TeamInvitation from "../models/TeamInvitation.js";
import User from "../models/User.js";

import sendEmail from "../services/emailService.js";
import escapeHtml from "../utils/escapeHtml.js";


export const sendTeamInvitation = async (req, res) => {
    try {
        const { teamId } = req.params;
        const { email } = req.body;

        // 1. Validate email
        if (!email || !email.trim()) {
            return res.status(400).json({
                message: "Invitee email is required.",
            });
        }

        const normalizedEmail = email.trim().toLowerCase();
        
        // 2. Check whether the team exists
        const team = await Team.findOne({
            _id: teamId,
            isActive: true,
        });

        if (!team) {
            return res.status(404).json({
                message: "Teams not found.",
            });
        }

        // 3. Check the requester's membership and role
        const membership = await TeamMembership.findOne({
            team: teamId,
            user: req.user._id,
            status: "active",
        });

        if (!membership || !["owner", "admin"].includes(membership.role)) {
            return res.status(403).json({
                message: "You don't have permission to invite members.",
            });
        }

        // 4. Prevent inviting an existing active member

        const invitedUser = await User.findOne({
            email: normalizedEmail,
        });

        if (invitedUser) {
            const existingMembership = await TeamMembership.findOne({
                team: teamId,
                user: invitedUser._id,
                status: "active",
            });

            if (existingMembership) {
                return res.status(409).json({
                    message: "This user is already a team member."
                });
            }
        }

        // 5. Prevent duplicate pending invitattions
        const existingInvitation = await TeamInvitation.findOne({
            team: teamId,
            email: normalizedEmail,
            status: "pending",
        });

        if (existingInvitation) {
            if (existingInvitation.expiresAt > new Date()) {
                return res.status(409).json({
                    message: "An invitation has already been sent to this email.",
                });
            }

            // Mark the expired invitation before creating a new one.
            existingInvitation.status = "expired";
            await existingInvitation.save();
}

        // 6. Generate a secure invitation token
        const rawToken = crypto.randomBytes(32).toString("hex");

        const tokenHash = crypto
            .createHash("sha256")
            .update(rawToken)
            .digest("hex");

        // Invitation expires in 7 days
        const expiresAt = new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000
        );

        // 7. Save invitation
        const invitation = await TeamInvitation.create({
            team: teamId,
            invitedBy: req.user._id,
            email: normalizedEmail,
            tokenHash,
            expiresAt,
        });

        const safeTeamName = escapeHtml(team.name);

        // 8. Construct invitation link
        const invitationLink = 
            `${process.env.FRONTEND_URL}/accept-invitation?token=${rawToken}`;

        // 9. Send invitation email
        try {
            await sendEmail({
                to: normalizedEmail,
                subject: `Invitation to join ${safeTeamName} on TaskForge`, // using 'safeTeamName' instead of 'team.name'
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
                        <h2>You've been invited to TaskForge!</h2>

                        <p>
                            You have been invited to join
                            <strong>${safeTeamName}</strong>.
                        </p>

                        <p>
                            Click the button below to accept your invitation:
                        </p>

                        <a
                            href="${invitationLink}"
                            style="
                                display: inline-block;
                                padding: 12px 20px;
                                background-color: #2563eb;
                                color: white;
                                text-decoration: none;
                                border-radius: 6px;
                            "
                        >
                            Accept Invitation
                        </a>

                        <p>This invitation expires in 7 days.</p>

                        <p>
                            If you weren't expecting this invitation,
                            you can safely ignore this email.
                        </p>
                    </div>
                `,
            });
        } catch (emailError) {
            // Remove the ivitation if email delivery fails
            await TeamInvitation.findByIdAndDelete(invitation._id);

            throw emailError;
        }

        return res.status(201).json({
            message: "Team invitation sent successfully.",
            invitation: {
                email: invitation.email,
                expiresAt: invitation.expiresAt,
            },
        });

    } catch (err) {
        console.error("Send team invitation error:", err);

        if (err.code === 11000) {
            return res.status(409).json({
                message: "A pending invitation already exists for this email.",
            });
        }

        return res.status(500).json({
            message: "Failed to send team invitation.",
        });
    }
};


export const acceptTeamInvitation = async (req, res) => {
    try {
        const { token } = req.body;

        // 1. Validate the invitation token
        if (!token || !token.trim()) {
            return res.status(400).json({
                message: "Invitation token is required.",
            });
        }

        // 2. Hash the received token
        const tokenHash = crypto
            .createHash("sha256")
            .update(token.trim())
            .digest("hex");

        // 3. Find the matching pending invitation
        const invitation = await TeamInvitation.findOne({
            tokenHash,
            status: "pending",
        });

        if (!invitation) {
            return res.status(404).json({
                message: "Invalid or already used invitation.",
            });
        }

        // 4. Check invitation expiry
        if (invitation.expiresAt <= new Date()) {
            invitation.status = "expired";
            await invitation.save();

            return res.status(410).json({
                message: "This invitation has expired.",
            });
        }

        // 5. Verify the logged-in user's email
        const user = await User.findById(req.user._id);
        console.log("Logged-in user email:", user.email);
console.log("Invitation recipient email:", invitation.email);

        if (!user) {
            return res.status(401).json({
                code: "USER_SESSION_INVALID",
                message: "Your account session is no longer valid. Please sign in again. or may be nor User account found",
            });
        }

        if (!user.isEmailVerified) {
            return res.status(403).json({
                message: "Please verify your email before accepting an invitation.",
            });
        }

        if (user.email.toLowerCase() !== invitation.email) {
            return res.status(403).json({
                code: "INVITATION_EMAIL_MISMATCH",
                message: "This invitation is associated with a different email address. Please sign in with the account that received the invitation.",
            });
        }

        // 6. Check whether the team is still active
        const team = await Team.findOne({
            _id: invitation.team,
            isActive: true,
        });

        if (!team) {
            return res.status(404).json({
                message: "This team is no longer available.",
            });
        }

        // 7. Check existing membership
        const existingMembership = await TeamMembership.findOne({
            team: invitation.team,
            user: user._id,
            status: "active",
        });

        if (existingMembership) {
            return res.status(409).json({
                message: "You are already a member of this team.",
            });
        }

        // 8. Claim the invitation to prevent reuse
        const claimedInvitation = await TeamInvitation.findOneAndUpdate(
            {
                _id: invitation._id,
                status: "pending",
                expiresAt: { $gt: new Date() },
            },
            {
                $set: {
                    status: "accepted",
                    acceptedAt: new Date(),
                },
            },
            { new: true }
        );

        if (!claimedInvitation) {
            return res.status(409).json({
                message: "This invitation has already been used or expired.",
            });
        }

        try {
            // 9. Create membership or reactivate an inactive membership
            await TeamMembership.findOneAndUpdate(
                {
                    team: invitation.team,
                    user: user._id,
                },
                {
                    $set: {
                        role: "member",
                        status: "active",
                        joinedAt: new Date(),
                    },
                },
                {
                    new: true,
                    upsert: true,
                    runValidators: true,
                }
            );
        } catch (membershipError) {
            // Restore invitation if membership creation fails
            await TeamInvitation.findOneAndUpdate(
                {
                    _id: invitation._id,
                    status: "accepted",
                },
                {
                    $set: {
                        status: "pending",
                        acceptedAt: null,
                    },
                }
            );

            throw membershipError;
        }

        return res.status(200).json({
            message: "You have successfully joined the team.",
            team: {
                id: team._id,
                name: team.name,
                role: "member",
            },
        });

    } catch (err) {
        console.error("Accept team invitation error:", err);

        return res.status(500).json({
            message: "Failed to accept team invitation.",
        });
    }
};