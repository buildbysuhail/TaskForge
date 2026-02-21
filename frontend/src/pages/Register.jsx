// import React from 'react'
import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

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
    <div>
      <h2>Register Page</h2>
      <form action="" onSubmit={handleSubmit}>
        <input name= "name" placeholder="Enter Name" onChange={handleChange}/>
        <input name= "email" placeholder="Enter Email" onChange={handleChange}/>
        <input name= "password" placeholder="Enter Password" type="password" onChange={handleChange}/>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Register
