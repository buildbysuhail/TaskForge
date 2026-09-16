import { Construction } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

function FeatureUnderDevelopment({ featureName }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center gap-4">
      <div className="flex items-center justify-center size-16 rounded-full bg-amber-100">
        <Construction className="size-8 text-amber-600" />
      </div>

      <div className="flex flex-col gap-1">
              <h2 className="text-xl font-semibold text-foreground">
                  {featureName ? (
                      <>
                          Feature <span className="text-blue-900">{featureName}</span> is under development
                      </>
                  ) : (
                      "Feature Under Development"
                  )}
              </h2>
        <p className="text-sm text-muted-foreground max-w-sm">
          We're actively working on this. Check back soon — it'll be ready shortly.
        </p>
      </div>

      {/* <Button variant="outline" onClick={() => navigate(-1)} className="mt-2">
        Go Back
      </Button> */}
    </div>
  );
}

export default FeatureUnderDevelopment;