import { LogOut, TestTube2 } from "lucide-react";
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
    <div className="top-0 left-0 w-full z-50 shrink-0">
    <div className="bg-gray-950 text-white py-1 px-4 flex items-center justify-between">
      <h1 className="text-xl flex items-center hover:bg-slate-800 py-1 px-2 rounded-md cursor-pointer gap-2">
        {/* Task Forge */}
        <img src="/src/assets/images/TF.Logo.png" className="w-10" alt="Task Forge" />
        <span className="w-full items-center justify-center font-extrabold font-[Pacifico]">
        TaskForge
        </span>
        </h1>

      <div className="flex justify-between gap-5">

      <button className="cursor-pointer p-2 rounded-md hover:bg-gray-700 transition-colors"
        // onClick={() => navigate("feature-check")}
        onClick={() => showToast.info("Feature stoped temp")}        
        title="Feature Check(Development purpose)"
      >
        <TestTube2 />
      </button>

        <button className="cursor-pointer p-2 rounded-md hover:bg-gray-700 transition-colors" onClick={()=>setOpen(true)} title="Logout">
          <LogOut />
          </button>
      </div>

        
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