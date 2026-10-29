// import React from 'react'
import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { showToast } from "@/lib/utils/toast";
import { Link } from "react-router-dom";

function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
    //  return
      try {
        setLoading(true);
        const res = await API.post("/auth/register", form);

        showToast.success(
          res.data.message ||
          "Registration successful. Please check your email."
        );

        navigate("/check-email", {
          state: { email: form.email.trim() },
        });
        console.log(res, "response");
      } catch (err) {
        console.error("Something Wrong: ", err);

        console.log("ERROR RESPONSE:", err.response?.data);

        if (err.response) {
          setError(err.response.data.message);
        } else {
          setError("Server not reachable");
        }
      } finally {
        setLoading(false);
      }
    }


  return (
    <div className="relative flex flex-col items-center justify-center min-h-dvh overflow-hidden bg-gradient-to-br from-teal-100 to-background">

      <div className="absolute top-3 right-3 text-xs sm:text-sm bg-inherit">
        Already have an account? 
        <Link to={"/"} className="hover:underline underline-offset-4 px-1 text-green-800 hover:text-green-600 font-semibold">
          Login
        </Link>
      </div>

      {/* Blurred glow shapes behind the glass */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-accent/40 blur-3xl" />

      {/* Decorative caption */}
      <div className="relative mb-6 text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
          Join Us
        </p>
        <h1 className="text-2xl font-semibold text-foreground">
          Create Your TaskForge Account
        </h1>
      </div>

      <Card className="relative w-[380px] border border-border/40 bg-card/60 backdrop-blur-xl shadow-2xl">
        <CardHeader>
          <CardTitle>Create Account</CardTitle>
          <CardDescription>Enter your details to register</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Error Message */}
            {error && (
              <p className="text-[11px] text-red-500 bg-red-50/80 backdrop-blur-sm p-1 rounded">
                {error}
              </p>
            )}

            <Input
              name="name"
              placeholder="Enter Name"
              onChange={handleChange}
              className="w-full border rounded p-2 bg-background/40 backdrop-blur-sm"
            />

            <Input
              name="email"
              placeholder="Enter Email"
              onChange={handleChange}
              className="w-full border rounded p-2 bg-background/40 backdrop-blur-sm"
            />

            <Input
              name="password"
              type="password"
              placeholder="Enter Password"
              onChange={handleChange}
              className="w-full border rounded p-2 bg-background/40 backdrop-blur-sm"
            />

            <Button
              type="submit"
              className="w-full text-white p-2 rounded"
              variant="default"
            >
              { loading ? <span className="bg-inherit animate-ping [animation-duration:1.3s] bg-gray-50 w-[49%] rounded-full h-3"/>:"Register"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Register
