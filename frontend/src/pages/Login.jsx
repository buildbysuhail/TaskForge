// import React from 'react'
import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

console.log("API URL:", API);
function Login() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        // return alert("ddsas")
        e.preventDefault();
        try {
            const res = await API.post("/auth/login", form);
            alert("Login successful ✅");
            localStorage.setItem("token", res.data.token);

            navigate("/dashboard");
        } catch (err) {
            console.error("login error: ", err);
            alert("Login failed");
        }
    }

  return (
    <div>
      <h2>Login Page</h2>
      <form action="" onSubmit={handleSubmit} >
        <input name="email" placeholder="Enter Email" onChange={handleChange}/>
        <input name="password" type="password" placeholder="Enter Password" onChange={handleChange}/>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
