import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";
// Outlet = where the page content will render.

function MainLayout() {
    return (
        <div className="h-screen flex flex-col">
            <Navbar />
            
            <div className="p-5
             flex-1 overflow-y-auto">
                <Outlet />
            </div>
        </div>
    )
}

export default MainLayout;