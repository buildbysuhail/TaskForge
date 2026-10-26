import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2, XCircle, LoaderCircle } from "lucide-react";
import API from "../services/api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  // taking token from the Url
  const token = searchParams.get("token");

  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("Verifying your email address...");

  useEffect(() => {
    let cancelled = false;

    const verifyEmail = async () => {
      if (!token) {
        setStatus("error");
        setMessage("The verification link is missing its token.");
        return;
      }

      try {
        const res = await API.get("/auth/verify-email", {
          params: { token },
        });

        if (!cancelled) {
          setStatus("success");
          setMessage(
            res.data.message || "Your email has been verified successfully."
          );
        }
      } catch (err) {
        if (!cancelled) {
          setStatus("error");
          setMessage(
            err.response?.data?.message ||
              "We couldn't verify your email. The link may be invalid or expired."
          );
        }
      }
    };

    verifyEmail();

    return () => {
      cancelled = true;
    };
  }, [token]);

  return (
    <div className="flex min-h-dvh items-center justify-center bg-gradient-to-br from-teal-100 to-background px-4">
      <Card className="w-full max-w-md border-border/40 bg-card/80 shadow-xl backdrop-blur-xl">
        <CardHeader className="items-center text-center">
          {status === "loading" && (
            <LoaderCircle className="h-12 w-12 animate-spin text-primary" />
          )}

          {status === "success" && (
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          )}

          {status === "error" && (
            <XCircle className="h-12 w-12 text-destructive" />
          )}

          <CardTitle className="text-2xl">
            {status === "loading"
              ? "Verifying Email"
              : status === "success"
                ? "Email Verified!"
                : "Verification Failed"}
          </CardTitle>

          <CardDescription>{message}</CardDescription>
        </CardHeader>

        <CardContent>
          {status !== "loading" && (
            <Button asChild className="w-full">
              <Link to="/login">
                {status === "success" ? "Continue to Login" : "Back to Login"}
              </Link>
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default VerifyEmail;