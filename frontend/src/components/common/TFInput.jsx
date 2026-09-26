import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

function TFInput({
  value,
  onChange,
  placeholder,
  type = "text",
  icon = null,
  size = "md",
  closeBtn=false,
  onClose = null,
  className = "",
  inputRef,
  ...props
}) {
  const sizes = {
    sm: "h-8 text-sm",
    md: "h-10 text-sm",
    lg: "h-12 text-base",
  };

  const Icon = icon;

  return (
    <div className="relative w-full">
      {Icon && (
        <Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      )}

      <Input
        ref={inputRef}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={cn(
          sizes[size],
          Icon && "pl-9",
          onClose && "pr-9",
          className
        )}
        {...props}
      />

          {onClose && (
              <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={onClose}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  aria-label="Clear input"
              >
                  {closeBtn && <X className="h-4 w-4" />}
              </button>
          )}
    </div>
  );
}

export default TFInput;

