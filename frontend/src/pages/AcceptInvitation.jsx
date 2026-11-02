
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Users, ArrowRight, LogIn, UserPlus } from "lucide-react";

import API from "../services/api";
import { showToast } from "@/lib/utils/toast";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

function AcceptInvitation() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const invitationToken = searchParams.get("token");

    const [loading, setLoading] = useState(false);

    const isLoggedIn = Boolean(localStorage.getItem("token"));

    const handleAcceptInvitation = async () => {
        if (!invitationToken) return;

        try {
            setLoading(true);

            const res = await API.post("/teams/invitations/accept", {
                token: invitationToken,
            });

            showToast.success(
                res.data.message || "You have successfully joined the team."
            );

            navigate("/dashboard", { replace: true });

        } catch (err) {
            showToast.error(
                err.response?.data?.message ||
                "Unable to accept this invitation. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    if (!invitationToken) {
        return (
            <div className="min-h-dvh flex items-center justify-center p-4 bg-gradient-to-br from-teal-50 to-background">
                <Card className="w-full max-w-md">
                    <CardHeader className="text-center">
                        <CardTitle>Invitation link unavailable</CardTitle>
                        <CardDescription>
                            We couldn't find an invitation token in this link.
                            Please check the invitation email and try again.
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <Button asChild className="w-full">
                            <Link to="/">Go to Login</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const registrationQuery =
        `?token=${encodeURIComponent(invitationToken)}`;

    const loginQuery =
        `/?inviteToken=${encodeURIComponent(invitationToken)}`;

    return (
        <div className="min-h-dvh flex items-center justify-center p-4 bg-gradient-to-br from-teal-50 to-background">

            <Card className="w-full max-w-md shadow-xl border-border/60">

                <CardHeader className="text-center space-y-4">

                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-2xl bg-teal-100 text-teal-700">
                        <Users size={32} />
                    </div>

                    <div className="space-y-2">
                        <CardTitle className="text-2xl font-bold">
                            You've been invited!
                        </CardTitle>

                        <CardDescription className="text-sm leading-relaxed">
                            Someone has invited you to collaborate with their
                            team on TaskForge.
                        </CardDescription>
                    </div>

                </CardHeader>

                <CardContent className="space-y-6">

                    <div className="rounded-lg bg-muted/50 p-4 space-y-2">
                        <h3 className="font-semibold text-sm">
                            Your next step
                        </h3>

                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Accept the invitation to join the team and start
                            collaborating on tasks, projects, and progress.
                        </p>
                    </div>

                    <div className="space-y-3">

                        {isLoggedIn ? (
                            <Button
                                className="w-full"
                                onClick={handleAcceptInvitation}
                                disabled={loading}
                            >
                                {loading
                                    ? "Accepting invitation..."
                                    : "Accept Invitation"
                                }

                                <ArrowRight className="ml-auto h-4 w-4" />
                            </Button>
                        ) : (
                            <>
                                <Button asChild className="w-full">
                                    <Link to={loginQuery}>
                                        <LogIn className="mr-2 h-4 w-4" />
                                        Sign in to accept invitation
                                        <ArrowRight className="ml-auto h-4 w-4" />
                                    </Link>
                                </Button>

                                <Button asChild variant="outline" className="w-full">
                                    <Link to={`/register${registrationQuery}`}>
                                        <UserPlus className="mr-2 h-4 w-4" />
                                        Create a TaskForge account
                                    </Link>
                                </Button>
                            </>
                        )}

                    </div>

                    <p className="text-xs text-center text-muted-foreground">
                        {isLoggedIn
                            ? "Make sure you're signed in with the email address that received this invitation."
                            : "Already have an account? Sign in to continue."
                        }
                    </p>

                </CardContent>

            </Card>
        </div>
    );
}

export default AcceptInvitation;
