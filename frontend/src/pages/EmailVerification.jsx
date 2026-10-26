import { Mail, ArrowLeft, RefreshCw } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import API from "../services/api";
import { showToast } from "@/lib/utils/toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function CheckYourEmail() {
  const location = useLocation();

  const [email, setEmail] = useState(location.state?.email || "");
  const [loading, setLoading] = useState(false);

  const handleResend = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      showToast.error("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/resend-verification", {
        email: email.trim(),
      });

      showToast.success(
        res.data.message || "If your account needs verification, a new email will be sent."
      );
    } catch (err) {
      showToast.error(
        err.response?.data?.message ||
          "Unable to resend the verification email. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-teal-100 to-background px-4">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-accent/40 blur-3xl" />

      <Card className="relative w-full max-w-md border border-border/40 bg-card/70 shadow-2xl backdrop-blur-xl">
        <CardHeader className="items-center text-center">
          <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Mail className="h-8 w-8 text-primary" />
          </div>

          <CardTitle className="text-2xl">
            Check Your Email
          </CardTitle>

          <CardDescription className="max-w-sm">
            Your TaskForge account has been created. Open the verification
            link we sent to your email address before logging in.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5">
          {email && (
            <p className="break-all text-center text-sm font-medium text-foreground">
              {email}
            </p>
          )}

          <div className="rounded-lg border bg-background/50 p-3 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">
              Didn't receive the email?
            </p>
            <p className="mt-1">
              Check your spam folder, or request another verification email below.
            </p>
          </div>

          <form onSubmit={handleResend} className="space-y-3">
            <Input
              type="email"
              name="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              <RefreshCw
                className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`}
              />
              {loading ? "Sending..." : "Resend Verification Email"}
            </Button>
          </form>

          <div className="text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default CheckYourEmail;