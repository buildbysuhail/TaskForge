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

function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    })

    const navigate = useNavigate();
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post("/auth/register", form);
            alert("Registered successfully ✅")
            navigate("/");
        } catch (err) {
            console.error("Something Wrong: ",err);
            alert("Registration failed ❌")
        }
    }
  return (
  <div className="flex items-center justify-center min-h-screen bg-gray-100">

    <Card className="w-[380px]">
      <CardHeader>
        <CardTitle>Create Account</CardTitle>
        <CardDescription>
          Enter your details to register
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">

          <Input
            name="name"
            placeholder="Enter Name"
            onChange={handleChange}
            className="w-full border rounded p-2"
          />

          <Input
            name="email"
            placeholder="Enter Email"
            onChange={handleChange}
            className="w-full border rounded p-2"
          />

          <Input
            name="password"
            type="password"
            placeholder="Enter Password"
            onChange={handleChange}
            className="w-full border rounded p-2"
          />

          <Button
            type="submit"
            className="w-full text-white p-2 rounded"
            variant="default"
          >
            Register
          </Button>

        </form>
      </CardContent>

    </Card>

  </div>
)
}

export default Register
