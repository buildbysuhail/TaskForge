import { useEffect, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { showToast } from "@/lib/utils/toast";

export function TFDropdown({
  trigger,
  label,
  items = [],
  values = {},
  onValueChange,

  // Customization
  align = "end",
  showSeparator = true,

//   onSelect,

  // Checkbox customization
  showCheckbox = true,

  // Apply button
  showApplyButton = false,
  applyButtonLabel = "Apply",
}) {
  const [tempValues, setTempValues] = useState(values);
  const [open, setOpen] = useState(false);

  // Keep temporary values synchronized with parent values
  useEffect(() => {
    setTempValues(values);
  }, [values]);

  const handleValueChange = (key, checked) => {
    // Apply mode:
    // only update temporary state
    if (showApplyButton) {
      setTempValues((prev) => ({
        ...prev,
        [key]: checked,
      }));

      return;
    }

    // Immediate mode:
    // update parent state directly
    onValueChange?.(key, checked);
  };

  const handleApply = () => {
    if (!showApplyButton) return;

    Object.entries(tempValues).forEach(([key, checked]) => {
      if (values[key] !== checked) {
        onValueChange?.(key, checked);
      }
    });
    setOpen(false)
    showToast.info("Column visibility updated.")
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>

      {/* Trigger */}
      <DropdownMenuTrigger asChild>
        {trigger}
      </DropdownMenuTrigger>

      {/* Dropdown */}
      <DropdownMenuContent align={align}>

        {/* Label */}
        {label && (
          <DropdownMenuLabel>
            {label}
          </DropdownMenuLabel>
        )}

        {label && showSeparator && (
          <DropdownMenuSeparator />
        )}

        {/* Items */}
        {items.map((item) => (
          <DropdownMenuCheckboxItem
            key={item.key}
            checked={
              showApplyButton
                ? tempValues[item.key] ?? true
                : values[item.key] ?? true
            }
            showCheckbox={showCheckbox}
            onSelect= {(e) => {
                if (showApplyButton) {
                    e.preventDefault();
                }
            }}
            onCheckedChange={(checked) =>
              handleValueChange(item.key, checked)
            }
          >
            {item.label}
          </DropdownMenuCheckboxItem>
        ))}

        {/* Apply Button */}
        {showApplyButton && (
          <>
            <DropdownMenuSeparator />

            <div className="flex justify-end px-1 pt-1">
              <Button
                size="sm"
                onClick={handleApply}
              >
                {applyButtonLabel}
              </Button>
            </div>
          </>
        )}

      </DropdownMenuContent>
    </DropdownMenu>
  );
}