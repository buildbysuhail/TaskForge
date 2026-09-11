// import { useState } from 'react'
// import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./layout/MainLayout";
import ProtectedRoute from "../routes/ProtectedRoute";
import { Toaster } from "sonner";
import CreateTask from "./pages/CreateTask";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <Router>
        <Toaster position="top-center" richColors closeButton />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Routes with Navbar */}
        <Route element= {<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-task" element={<CreateTask />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App
