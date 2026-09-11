import { LogOut } from "lucide-react";
import { TFConfirmModal } from "./common/modals";
import { useState } from "react";
import { showToast } from "@/lib/utils/toast";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    // Perform logout logic here
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    showToast.success("Logged out successfully");
    navigate("/");
    
  }

  return (
    <div>
    <div className="bg-gray-900 text-white p-4 flex items-center justify-between">
      <h1 className="text-xl font-bold">
        {/* Task Forge */}
        <img src="/src/assets/images/TF.Logo.png" className="w-10" alt="Task Forge" />
        </h1>

        <button className="cursor-pointer" onClick={()=>setOpen(true)} title="Logout">
          <LogOut />
          </button>
    </div>
    <TFConfirmModal 
      open={open}
      onOpenChange={setOpen}
      title="Logout ?"
      description="Are you sure you want to logout ?"
      onConfirm={handleLogout}
      confirmText="Logout"
      cancelText="Cancel"
    />
  
    </div>
  );
}

export default Navbar;