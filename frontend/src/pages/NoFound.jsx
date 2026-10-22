import { Link } from "react-router-dom";
import { Compass, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background px-6">
      {/* Soft background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative z-10 flex max-w-md flex-col items-center text-center animate-in fade-in zoom-in-95 duration-500">
        {/* Icon */}
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full border bg-muted">
          <Compass className="h-7 w-7 text-muted-foreground" />
        </div>

        {/* Big 404 */}
        <h1 className="select-none text-8xl font-bold tracking-tighter text-foreground/10 sm:text-9xl">
          404
        </h1>

        {/* Heading + message */}
        <h2 className="-mt-4 text-2xl font-semibold tracking-tight text-foreground sm:-mt-6 sm:text-3xl">
          Page not found
        </h2>
        <p className="mt-3 text-sm text-muted-foreground sm:text-base">
          The page you're looking for doesn't exist or may have been moved.
          Let's get you back on track.
        </p>

        {/* Action */}
        <Button asChild size="lg" className="mt-8 gap-2">
          <Link to="/dashboard">
            <LayoutDashboard className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;