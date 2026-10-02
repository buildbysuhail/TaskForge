import Navbar from "@/components/Navbar";
// import { ScrollArea } from "@/components/ui/scroll-area";
import TFScrollArea from "@/components/common/TFScrollArea";
import { Outlet } from "react-router-dom";
// Outlet = where the page content will render.

function MainLayout() {
    return (
        <div className="h-screen flex flex-col">
            <Navbar />

            <TFScrollArea className="flex-1 min-h-0"
                scrollbarClassName="bg-muted/70 dark:bg-muted/80 data-[orientation=vertical]:w-[15px]"
                thumbClassName="bg-stone-500 hover:bg-stone-600 rounded-[3px]
                                dark:bg-zinc-600 dark:hover:bg-zinc-500"
            >
                <div className="p-5">
                    <Outlet />
                </div>
            </TFScrollArea>
        </div>
    )
}

export default MainLayout;