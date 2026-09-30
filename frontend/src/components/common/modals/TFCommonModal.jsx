import * as React from "react";

import { useMediaQuery } from "@/hooks/use-media-query";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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

function TFCommonModal({
  open,
  onOpenChange,

  trigger,

  title,
  description,

  children,

  footer,

  dialogClassName = "",
  drawerClassName = "",
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // ----------------------------------
  // Desktop → Dialog
  // ----------------------------------
  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        {trigger && (
          <DialogTrigger asChild>
            {trigger}
          </DialogTrigger>
        )}
{/* width can adjusted by: sm:max-w-4xl */}
        <DialogContent className={` ${dialogClassName}`}>
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}

            {description && (
              <DialogDescription>
                {description}
              </DialogDescription>
            )}
          </DialogHeader>

          {children}


            {footer}
          {/* {footer && (
          <DrawerFooter className="pt-2">
            {footer}
          </DrawerFooter>
        )} */}
        </DialogContent>
      </Dialog>
    );
  }

  // ----------------------------------
  // Mobile → Drawer
  // ----------------------------------
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      {trigger && (
        <DrawerTrigger render={trigger}>
          {trigger}
        </DrawerTrigger>
      )}

      <DrawerContent className={drawerClassName}>
        <DrawerHeader className="text-left">
          {title && <DrawerTitle>{title}</DrawerTitle>}

          {description && (
            <DrawerDescription>
              {description}
            </DrawerDescription>
          )}
        </DrawerHeader>

        {children}

        {footer && (
          <DrawerFooter className="pt-2">
            {footer}
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
}

export default TFCommonModal;