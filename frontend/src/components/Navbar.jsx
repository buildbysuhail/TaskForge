import { LogOut, Moon, Sun, TestTube2 } from "lucide-react";
import { TFConfirmModal } from "./common/modals";
import { useState } from "react";
import { showToast } from "@/lib/utils/toast";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    // Perform logout logic here
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    showToast.success("Logged out successfully");
    navigate("/");
    
  }

  const toggleTheme = () => {
  setDarkMode((prev) => {
    const newMode = !prev;

    document.documentElement.classList.toggle("dark", newMode);

    return newMode;
  });
};

  return (
    <div className="top-0 left-0 w-full z-50 shrink-0">
    <div className="bg-stone-400 dark:bg-zinc-950 dark:text-white py-1 px-4 flex items-center justify-between">
      <h1 className="text-xl flex items-center hover:bg-stone-500 hover:dark:bg-slate-800 py-1 px-2 rounded-md cursor-pointer gap-2">
        {/* Task Forge */}
        <img src="/src/assets/images/TF.Logo.png" className="w-10" alt="Task Forge" />
        <span className="w-full items-center justify-center text-emerald-950 hover:text-emerald-500 dark:text-teal-600 font-extrabold font-[Pacifico]">
        TaskForge
        </span>
        </h1>

      <div className="flex justify-between gap-5">

        <button className="cursor-pointer  rounded-md hover:bg-stone-300 hover:dark:bg-gray-700 transition-colors"
          onClick={toggleTheme}
          title="Change Theme"
        >
          {darkMode ?
          <Moon className="dark:text-sky-800 dark:hover:text-sky-400 w-9 h-9 p-2" /> : 
          <Sun className="text-yellow-800 hover:text-amber-700 w-9 h-9 p-2" />
        }
          
        </button>

      <button className="cursor-pointer rounded-md hover:bg-stone-300 hover:dark:bg-gray-700 transition-colors"
        onClick={() => navigate("feature-check")}
        // onClick={() => showToast.info("Feature stoped temp")}        
        title="Feature Check(Development purpose)"
      >
        <TestTube2 className="text-indigo-950 hover:text-indigo-800 dark:text-fuchsia-800 dark:hover:text-fuchsia-400 w-9 h-9 p-2" />
      </button>

        <button className="cursor-pointer rounded-md hover:bg-stone-300 hover:dark:bg-gray-700 transition-colors" onClick={()=>setOpen(true)} title="Logout">
          <LogOut className="text-red-900 hover:text-red-800 dark:text-red-900 dark:hover:text-red-500 w-9 h-9 p-2" />
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