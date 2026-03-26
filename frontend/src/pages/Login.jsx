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
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

function PasswordInput({ value, onChange }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        id="password"
        name="password"
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        className="pr-10"
        required
      />

      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
      </Button>
    </div>
  );
}

console.log("API URL:", API);
function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    // return alert("testing submit");
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await API.post("/auth/login", form);
      alert("Login successful ✅");
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard");
    } catch (err) {
      console.error("login error: ", err);
      if (err.response) {
        setError(err.response.data.message || "Login failed");
      } else {
        setError("Server not reachable");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    // <div>
    //   <h2>Login Page</h2>

    //   {error && <p style={{ color: "red" }}>{error}</p>}

    //   <form action="" onSubmit={handleSubmit}>
    //     <input name="email" placeholder="Enter Email" onChange={handleChange} />
    //     <input
    //       name="password"
    //       type="password"
    //       placeholder="Enter Password"
    //       onChange={handleChange}
    //     />
    //     <button type="submit">{loading ? "Logging in..." : "Login"}</button>
    //   </form>
    // </div>
    <div className="flex items-center min-h-screen justify-center">
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription className="text-sm">
          Enter your email below to login to your account
        </CardDescription>
        {/* <CardAction>
          <Button variant="link">Sign Up</Button>--
        </CardAction> */}
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                onChange={handleChange}
                value={form?.email}
                required
              />
              {error && <p className="text-red-600 text-sm">{error}</p>}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline cursor-not-allowed"
                  title="Under development"
                >
                  Forgot your password?
                </a>
              </div>
              <PasswordInput value={form.password} onChange={handleChange} />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Login
          </Button>
          <Button disabled={true} variant="outline" className="w-full cursor-not-allowed" title="Under development">
            Login with Google
          </Button>
        </CardFooter>
      </form>
    </Card>
    </div>
  );
}

export default Login;
