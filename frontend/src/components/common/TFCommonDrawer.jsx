"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Button } from "@/components/ui/button";

function TFCommonDrawer({
  trigger,
  title,
  description,
  children,
  footer,
  showCloseButton = true,
  contentClassName,
  open,
  onOpenChange,
}) {
  return (
    <Drawer
      open={open}
      onOpenChange={onOpenChange}
    >
      {trigger && (
        <DrawerTrigger asChild>
          {trigger}
        </DrawerTrigger>
      )}

      <DrawerContent className={contentClassName}>
        {(title || description) && (
          <DrawerHeader>
            {title && (
              <DrawerTitle>
                {title}
              </DrawerTitle>
            )}

            {description && (
              <DrawerDescription>
                {description}
              </DrawerDescription>
            )}
          </DrawerHeader>
        )}

        <div className="flex-1 p-4">
          {children}
        </div>

        {(footer || showCloseButton) && (
          <DrawerFooter>
            {footer}

            {showCloseButton && (
              <DrawerClose asChild>
                <Button variant="outline">
                  Close
                </Button>
              </DrawerClose>
            )}
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
}

export default TFCommonDrawer;