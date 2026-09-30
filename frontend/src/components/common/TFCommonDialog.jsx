import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

function TFCommonDialog({
  // Trigger
  trigger,

  // Dialog state
  open,
  onOpenChange,

  // Header
  title,
  description,

  // Content
  children,

  // Footer
  footer,

  // Close behavior
  showCloseButton = true,
  showFooterCloseButton = false,
  noClose = false,

  // Action
  showActionButton = false,
  actionLabel = "Confirm",
  onAction,
  actionVariant = "default",
  actionLoading = false,

  // Styling
  className = "",
  contentClassName = "",
  overlayClassName = "",

  // Dialog configuration
  modal = true,
}) {
  /*
   * noClose has priority over the normal close options.
   *
   * This means:
   * - No X button
   * - No footer Close button
   * - Dialog cannot be closed by clicking outside
   * - Dialog cannot be closed using Escape
   */
  const isNoClose = noClose;

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      modal={modal}
    >
      {/* Trigger */}
      {trigger && (
        <DialogTrigger asChild>
          {trigger}
        </DialogTrigger>
      )}

      <DialogContent
        showCloseButton={!isNoClose && showCloseButton}
        className={`${contentClassName} ${className}`}
        overlayClassName={overlayClassName}
        onEscapeKeyDown={
          isNoClose
            ? (event) => event.preventDefault()
            : undefined
        }
        onPointerDownOutside={
          isNoClose
            ? (event) => event.preventDefault()
            : undefined
        }
      >
        {/* Header */}
        {(title || description) && (
          <DialogHeader>
            {title && (
              <DialogTitle>
                {title}
              </DialogTitle>
            )}

            {description && (
              <DialogDescription>
                {description}
              </DialogDescription>
            )}
          </DialogHeader>
        )}

        {/* Body */}
        {children}

        {/* Footer */}
        {(footer ||
          showActionButton ||
          (!isNoClose && showFooterCloseButton)) && (
          <DialogFooter>
            {footer}

            {showActionButton && (
              <Button
                variant={actionVariant}
                onClick={onAction}
                disabled={actionLoading}
              >
                {actionLoading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}

                {actionLoading ? "Please wait..." : actionLabel}
              </Button>
            )}

            {!isNoClose && showFooterCloseButton && (
              <DialogClose asChild>
                <Button variant="outline">
                  Close
                </Button>
              </DialogClose>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default TFCommonDialog;
