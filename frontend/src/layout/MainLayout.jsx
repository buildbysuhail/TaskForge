import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";
// Outlet = where the page content will render.

function MainLayout() {
    return (
        <>
        <Navbar />
        <div className="p-6">
            <Outlet />
        </div>
        </>
    )
}

export default MainLayout;