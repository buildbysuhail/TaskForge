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
  titleClassName="",

  description,
  descriClassName= "",

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

      <DrawerContent className={ `flex flex-col ${contentClassName || ''}`}>
        {(title || description) && (
          <DrawerHeader>
            {title && (
              <DrawerTitle className={`text-xl ${titleClassName}`}>
                {title}
              </DrawerTitle>
            )}

            {description && (
              <DrawerDescription className={` ${descriClassName}`}>
                {description}
              </DrawerDescription>
            )}
          </DrawerHeader>
        )}

        <div className="flex-1 overflow-y-auto p-4">
          {children}
        </div>

        {(footer || showCloseButton) && (
          <DrawerFooter className="flex flex-row gap-2 border-t">          

            {showCloseButton && (
              <DrawerClose asChild>
                <Button variant="outline" className="flex-1 h-[47px]">
                  Close
                </Button>
              </DrawerClose>              
            )}

            <div className="flex-1">
              {footer}
            </div>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
}

export default TFCommonDrawer;