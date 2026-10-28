import Navbar from "@/components/Navbar";
// import { ScrollArea } from "@/components/ui/scroll-area";
import TFScrollArea from "@/components/common/TFScrollArea";
import { Outlet } from "react-router-dom";
import { Monitor, X } from "lucide-react";
import useLocalStorage from "@/hooks/useLocalStorage";
// Outlet = where the page content will render.

function MainLayout() {

    const [hideMobileNotice, setHideMobileNotice] = useLocalStorage("TF-hide-mobile-notice", false);
    return (
        <div className="h-dvh flex flex-col">
            <Navbar />

            {!hideMobileNotice && (
                <div className="md:hidden flex items-start gap-2 px-3 py-2 text-xs bg-amber-100 text-amber-900 dark:bg-amber-900/30 dark:text-amber-200">
                    <Monitor className="size-4 shrink-0 mt-0.5" />
                    <p className="flex-1">
                        TaskForge works best on a desktop or tablet. Some features may feel cramped on phones.
                    </p>
                    <button
                        onClick={() => setHideMobileNotice(true)}
                        aria-label="Dismiss notice"
                        className="shrink-0"
                    >
                        <X className="size-4" />
                    </button>
                </div>
            )}

            <TFScrollArea className="flex-1 min-h-0"
                scrollbarClassName="bg-muted/70 dark:bg-muted/80 data-[orientation=vertical]:w-[10px] sm:data-[orientation=vertical]:w-[15px]"
                thumbClassName="bg-stone-500 hover:bg-stone-600 rounded-[3px]
                                dark:bg-zinc-600 dark:hover:bg-zinc-500"
            >
                <div className="p-3 sm:p-5">
                    <Outlet />
                </div>
            </TFScrollArea>
        </div>
    )
}

export default MainLayout;