import * as React from "react";


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

// import { ScrollArea } from "./ui/scroll-area";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ResponsiveDialogProps {
  description?: string;
  buttonText?: string | React.ReactNode;
  buttonVariant?:
    | "outline"
    | "default"
    | "destructive"
    | "secondary"
    | "ghost"
    | "link";
  buttonClassname?: string;
  title?: string | undefined;
  buttonSize?: "default" | "sm" | "lg" | "icon" | null | undefined;
  customTrigger?: React.ReactNode;
  customJSXContent?: React.ReactNode;
  isDisabled?: boolean;
  cancelButtonOff?: boolean;
  dialogOnMobile? : boolean; // controls if a dialog should be used in mobile or not
  fitContentToHeight?: boolean;  // determines if the scroll area component height used should be set to fit-content or a default height should be used 
}

export function ResponsiveDialog({
  description,
  buttonText,
  buttonSize,
  buttonClassname,
  buttonVariant,
  title,
  isDisabled,
  customTrigger,
  customJSXContent,
  cancelButtonOff,
  dialogOnMobile,
  fitContentToHeight,
  ...props
}: ResponsiveDialogProps) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 500px)");

  if (isDesktop || dialogOnMobile) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {customTrigger ? (
            customTrigger
          ) : (
            <Button variant="outline">{buttonText}</Button>
          )}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] flex flex-col">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[65vh] my-4 flex flex-col">
            {customJSXContent && customJSXContent}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        {customTrigger ? (
          customTrigger
        ) : (
          <Button variant="outline">{buttonText}</Button>
        )}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description && description}</DrawerDescription>
        </DrawerHeader>
        <ScrollArea className={`w-full ${fitContentToHeight ? "h-fit" : "h-[65vh]"} my-4`}>
          {customJSXContent && customJSXContent}
        </ScrollArea>
        <DrawerFooter className="pt-2">
          {/* if cancelButtonOff prop is not passed or it is not defined, render the cancel button */}
          {!cancelButtonOff && (
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
