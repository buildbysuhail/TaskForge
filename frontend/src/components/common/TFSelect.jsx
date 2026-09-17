import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function TFSelect({
  label,
  value,
  onValueChange,
  placeholder = "Select an option",
  options = [],
  className = "",
  triggerClassName = "",
  contentClassName = "",
  itemClassName = "",
  valueClassName = "",
  disabled = false,
  align = "start",        // "start" | "center" | "end"
  side = "bottom",        // "top" | "bottom" | "left" | "right"
  sideOffset = 4,         // gap (px) between trigger and panel
  alignOffset = 0,        // shift along the alignment axis (px)
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label className="text-sm font-medium">
          {label}
        </label>
      )}

      <Select
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
      >
        <SelectTrigger className={`w-full ${triggerClassName}`}>
          <span className={valueClassName}>
            <SelectValue placeholder={placeholder} />
          </span>
        </SelectTrigger>

        <SelectContent
          className={contentClassName}
          align={align}
          side={side}
          sideOffset={sideOffset}
          alignOffset={alignOffset}
        >
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className={option.className || itemClassName}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default TFSelect;