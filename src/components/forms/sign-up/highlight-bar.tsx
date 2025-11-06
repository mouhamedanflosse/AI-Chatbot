import { useAuthContextHook } from "@afs/context/use-auth-context";
import { cn } from "@afs/lib/utils";
import React from "react";

const HighLightBar = () => {
  const { currentStep } = useAuthContextHook();

  return (
    <div className="grid grid-cols-3 gap-3">
      <div
        className={cn(
          "rounded-full h-2 col-span-1",
          currentStep == 1
            ? "bg-[hsl(var(--primary))]"
            : "bg-[hsl(var(--secondary))]"
        )}
      ></div>
      <div
        className={cn(
          "rounded-full h-2 col-span-1",
          currentStep == 2
            ? "bg-[hsl(var(--primary))]"
            : "bg-[hsl(var(--secondary))]"
        )}
      ></div>
      <div
        className={cn(
          "rounded-full h-2 col-span-1",
          currentStep == 3
            ? "bg-[hsl(var(--primary))]"
            : "bg-[hsl(var(--secondary))]"
        )}
      ></div>
    </div>
  );
};
export default HighLightBar;
