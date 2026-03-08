// import { useState } from 'react'
// import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <Router>
      <h1 className='text-green-800 text-2xl'>Task Forge - A Project Management App</h1>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App
