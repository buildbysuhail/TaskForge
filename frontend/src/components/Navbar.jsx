import { LogOut, Moon, Sun, TestTube2 } from "lucide-react";
import { TFConfirmModal } from "./common/modals";
import TFAvatar from "./common/TFAvatar";
// import TFCommonDialog from "./common/TFCommonDialog";
import TFCommonDrawer from "./common/TFCommonDrawer";
import TeamSelector from "./teams/TeamSelector";
import { useWorkspace } from "@/context/WorkSpaceContext";
import { useState, useEffect } from "react";
import { showToast } from "@/lib/utils/toast";
import { useNavigate } from "react-router-dom";
// import { Button } from "./ui/button";
import useLocalStorage from "@/hooks/useLocalStorage";
import TFLogo from "../assets/images/TF.Logo.png";

function Navbar() {
  const navigate = useNavigate();
  const { selectedTeam, setSelectedTeam } = useWorkspace();

  const [open, setOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const [darkMode, setDarkMode] = useLocalStorage(
    "TF-Theme-Dark",
    false
  )

  const handleLogout = () => {
    // Perform logout logic here
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    showToast.success("Logged out successfully");
    navigate("/");
    
  }

useEffect(() => {
  document.documentElement.classList.toggle("dark", darkMode);
}, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
    showToast.success(darkMode ? "Light Theme": "Dark Theme");
};
const user = JSON.parse(localStorage.getItem("user"));
// console.log(user, "UserNameee")

  return (
    <div className="top-0 left-0 w-full z-50 shrink-0">
    <div className="bg-stone-400 dark:bg-zinc-950 dark:text-white py-1 px-2 sm:px-4 flex items-center justify-between">
        <button className="text-base sm:text-xl flex items-center hover:bg-muted/30 hover:dark:bg-slate-800
                      text-emerald-950 hover:text-emerald-700 dark:text-teal-600
                        py-1 px-2 rounded-md cursor-pointer gap-1 sm:gap-2 min-w-0"
          onClick={() => navigate("/dashboard")}
        >
          {/* Task Forge */}
          <img src={TFLogo} className="w-8 sm:w-10 shrink-0" alt="Task Forge" />
          <span className="w-full items-center justify-center font-extrabold 
          font-[Pacifico] select-none truncate">
            TaskForge
          </span>
        </button>

        <div className="flex justify-between gap-2 sm:gap-5 shrink-0">

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

          <button className="cursor-pointer rounded-md hover:bg-stone-300 hover:dark:bg-gray-700 transition-colors" onClick={() => setOpen(true)} title="Logout">
            <LogOut className="text-red-900 hover:text-red-800 dark:text-red-900 dark:hover:text-red-500 w-9 h-9 p-2" />
          </button>

          <TFCommonDrawer
            direction="right"
            open={openDrawer}
            onOpenChange={setOpenDrawer}
            showCloseButton={false}
            contentClassName="w-full sm:max-w-md"
            trigger={
              <button
                type="button"
                className="rounded-full cursor-pointer"
                title="Open workspace"
              >
                <TFAvatar
                  name={user.name}
                  className="cursor-pointer"
                  title={true}
                />
              </button>
            }
          >
            <div className="flex flex-col gap-6">

              {/* User Profile */}
              <section className="rounded-xl border bg-muted/30 p-4">
                <div className="flex items-center gap-4">
                  <TFAvatar
                    name={user.name}
                    size="lg"
                  />

                  <div className="min-w-0">
                    <h2 className="truncate text-base font-semibold">
                      {user.name}
                    </h2>

                    <p className="truncate text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
              </section>

              {/* Workspace */}
              <section className="flex flex-col gap-3">
                {/* <div>
                  <h3 className="font-semibold">
                    Workspace
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    Switch between your personal tasks and team workspaces.
                  </p>
                </div> */}

                <TeamSelector
                  selectedTeam={selectedTeam}
                  onTeamChange={setSelectedTeam}
                />
              </section>

            </div>
          </TFCommonDrawer>



          {/* <TFCommonDialog
            trigger={<button type="button">
              <TFAvatar
                name={user.name}
                className="cursor-pointer"
                title={true}
              />
            </button>}
            showCloseButton={false}
            contentClassName="p-0"
            overlayClassName="backdrop-blur-sm"
          >
            <div className="flex flex-col bg-stone-300 dark:bg-gray-800 rounded-lg items-center gap-3 pb-4">
              <div className="flex dark:bg-gray-700 rounded-md w-full justify-center h-full">
              <TFAvatar
                src={""}
                name={user.name}
                size="lg"
              />
              </div>
              <p className="text-left w-full px-5">User Info :-</p>

              <p className="text-base font-medium dark:text-gray-100 flex justify-between w-[70%] sm:w-[65%]">
                <span className="font-bold">Name:</span>

                <span>
                  {user.name}
                </span>

              
                
              </p>
              <p className="text-base font-medium dark:text-gray-100 flex justify-between w-[70%] sm:w-[65%]">
                <span className="font-bold">Email:</span>

                <span>
                  {user.email}
                </span>
              </p>

                <button className="cursor-not-allowed p-3 border border-gray-200 rounded-md">
                  Add New User
                </button>
            </div>
          </TFCommonDialog> */}
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