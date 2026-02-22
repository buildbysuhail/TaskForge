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
    <div>
      <h2>Login Page</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form action="" onSubmit={handleSubmit}>
        <input name="email" placeholder="Enter Email" onChange={handleChange} />
        <input
          name="password"
          type="password"
          placeholder="Enter Password"
          onChange={handleChange}
        />
        <button type="submit">{loading ? "Logging in..." : "Login"}</button>
      </form>
    </div>
  );
}

export default Login;
